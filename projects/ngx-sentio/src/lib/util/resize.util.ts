import { ElementRef } from '@angular/core';
import { interval, Observable, Observer } from 'rxjs';
import { debounceTime, filter, map, publish, refCount, sample } from 'rxjs/operators';

import { select as d3_select } from 'd3-selection';

/* tslint:disable:max-classes-per-file */
export interface ElementSize {
	width: number;
	height: number;
}
export interface ResizeInfo {
	element: ElementSize;
	parent: ElementSize;
}

/**
 * Resize utility class
 */
export class ResizeUtil {
	chartElement: any;
	enabled: boolean;

	resizeSource: Observable<ResizeInfo>;
	resizeObserver: Observer<ResizeInfo>;

	constructor(el: ElementRef, enabled: boolean = true, debounce: number = 200, sampleNum: number = 100) {
		this.enabled = enabled;

		this.chartElement = d3_select(el.nativeElement);
		this.chartElement.style('display', 'block');

		// Create a hot observable for resize events
		this.resizeSource = Observable
			.create((observer: Observer<ResizeInfo>) => {
				this.resizeObserver = observer;
			})
			.pipe(
				publish(),
				refCount(),
				filter(() => this.enabled)
			);

		if (null != debounce) {
			this.resizeSource = this.resizeSource.pipe(debounceTime(debounce));
		}
		if (null != sampleNum) {
			this.resizeSource = this.resizeSource.pipe(sample(interval(sampleNum)));
		}
		this.resizeSource = this.resizeSource.pipe(map(() => this.getSize()));
	}

	static parseFloat(value: any, defaultValue: number): number {
		const toReturn = parseFloat(value);
		return ((isNaN(toReturn)) ? defaultValue : toReturn);
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

	getComputedElementSize(element: any): ElementSize {
		// Get the raw body element
		const body = document.body;

		// Cache the old overflow style
		const overflow: string = body.style.overflow;
		body.style.overflow = 'hidden';

		const cs = getComputedStyle(element);

		const width = ResizeUtil.parseFloat(cs.width, 0);
		const height = ResizeUtil.parseFloat(cs.height, 0);

		// Reapply the old overflow setting
		body.style.overflow = overflow;

		return { width, height };
	}


	/**
	 * Gets the size context info for the current element
	 * Two relevant things are computed:
	 *
	 * element size:
	 *   Determines the chart size if the user has tried to specify the size on the directive
	 *   - directive element size
	 *
	 * parent size:
	 *   Used when resizing to fit parent. The size returned should be the size that the element should be.
	 *   - directive parent size minus padding, margin, and border
	 *
	 *
	 * @returns {ResizeDimension}
	 */
	getSize(): ResizeInfo {
		const element = this.getComputedElementSize(this.chartElement.node());
		const parent = this.getComputedElementSize(this.chartElement.node().parentElement);

		return { element, parent };
	}

	destroy(): void {
		this.resizeObserver.complete();
	}
}
