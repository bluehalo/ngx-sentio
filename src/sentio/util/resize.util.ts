import { ElementRef } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import * as d3 from 'd3';

export class ResizeDimension {
	constructor(public width: number, public height: number) { }
}

/**
 * Resize utility class
 */
export class ResizeUtil {
	chartElement: any;
	enabled: boolean;

	resizeSource: Observable<ResizeDimension>;
	resizeObserver: Observer<ResizeDimension>;

	constructor(el: ElementRef, enabled: boolean = true, debounce: number = 200, sample: number = 100) {
		this.enabled = enabled;

		this.chartElement = d3.select(el.nativeElement);

		// Create a hot observable for resize events
		this.resizeSource = Observable
			.create((observer: Observer<ResizeDimension>) => {
				this.resizeObserver = observer;
			})
			.publish()
			.refCount()
			.filter(() => this.enabled);

		if (null != debounce) {
			this.resizeSource = this.resizeSource.debounceTime(debounce);
		}
		if (null != sample) {
			this.resizeSource = this.resizeSource.sample(Observable.interval(sample));
		}
		this.resizeSource = this.resizeSource.map(() => this.getSize());
	}

	/**
	 * Determines the numerical dimension given a string representation
	 * Assumes the string is in the form 'NNNNNpx', more specifically
	 * an arbitrarily long sequence of digits terminated by 'px'
	 *
	 * @param dimStr A string representation of the pixel size
	 * @returns {number} the numerical representation of the pixel size
	 */
	static getPixelDimension(dimStr: string): number {
		let dim: number;

		if (null != dimStr && '' !== dimStr) {
			dim = parseFloat(dimStr.substring(0, dimStr.length - 2));
			if (null == dim || isNaN(dim)) {
				dim = undefined;
			}
		}

		return dim;
	}

	/**
	 * Returns the size of the element (only returns height/width if they are specified on the DOM elements)
	 * Checks attributes and style
	 *
	 * @param element
	 * @returns {ResizeDimension}
	 */
	static getSpecifiedSize(element: any): ResizeDimension {
		let width: number = element.attributes.width || ResizeUtil.getPixelDimension(element.style.width);
		let height: number = element.attributes.height || ResizeUtil.getPixelDimension(element.style.height);

		return new ResizeDimension(width, height);
	}

	/**
	 * Returns the size of the element
	 * Checks client size
	 *
	 * @param element
	 * @returns {ResizeDimension}
	 */
	static getActualSize(element: any): ResizeDimension {
		let width: number = element.clientWidth;
		let height: number = element.clientHeight;

		return new ResizeDimension(width, height);
	}

	/**
	 * Gets the specified dimensions of the element
	 * @returns {ResizeDimension}
	 */
	getSpecifiedSize(): ResizeDimension {
		return ResizeUtil.getSpecifiedSize(this.chartElement.node());
	}

	/**
	 * Get the element size (with no overflow)
	 * @returns {ResizeDimension}
	 */
	getActualSize(): ResizeDimension {

		// Get the raw body element
		let body = document.body;

		// Cache the old overflow style
		let overflow: string = body.style.overflow;
		body.style.overflow = 'hidden';

		// The first element child of our selector should be the <div> we injected
		let rawElement = this.chartElement.node().firstElementChild;

		let size = ResizeUtil.getActualSize(rawElement);

		// Reapply the old overflow setting
		body.style.overflow = overflow;

		return size;
	}

	/**
	 * Gets the size of the element (this is the actual size overridden by specified size)
	 * @returns {ResizeDimension}
	 */
	getSize(): ResizeDimension {
		let specifiedSize = this.getSpecifiedSize();
		let size = this.getActualSize();

		if (null != specifiedSize.height) {
			size.height = specifiedSize.height;
		}
		if (null != specifiedSize.width) {
			size.width = specifiedSize.width;
		}

		return size;
	}

	destroy(): void {
		this.resizeObserver.complete();
	}
}
