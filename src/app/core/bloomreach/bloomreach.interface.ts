/*
 * Copyright 2020 Hippo B.V. (http://www.onehippo.com)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

export interface DocumentModels {
	document?: import('@bloomreach/spa-sdk').Reference;
}

export interface DocumentRef {
	$ref: string;
}

export interface BrRichText {
	contentType: 'hippostd:html';
	value: string;
}

export interface DocumentData {
	author: string;
	content: DocumentContent;
	date: number;
	image: import('@bloomreach/spa-sdk').Reference;
	introduction: string;
	title: string;

	[property: string]: any;
}

export interface DocumentContent {
	value: string;
}

export interface MenuModels {
	menu?: import('@bloomreach/spa-sdk').Menu;
}

export interface PageableModels {
	pageable: Pageable;
}

export interface Pageable {
	currentPage: number;
	currentRange: number[];
	endOffset: number;
	endPage: number;
	items: import('@bloomreach/spa-sdk').Reference[];
	maxSize: number;
	next: boolean;
	nextBatch: boolean;
	nextPage: number | null;
	pageNumbersArray: number[];
	pageSize: number;
	previous: boolean;
	previousPage: number | null;
	showPagination: boolean;
	startOffset: number;
	startPage: number;
	total: number;
	totalPages: number;
	visiblePages: number;
}

export interface BrPdf {
	displayName?: string;
	filename?: string;
	description?: string;
	name?: string;
	_links?: {
		site?: {
			href?: string;
			type?: string;
		};
	};
}

export interface BrLink {
	alignment: string;
	contentType: 'brxm:LinkCompound';
	displayName: 'brxm:bannerLinks';
	name: 'brxm:bannerLinks';
	target?: string;
	url?: string;
	link: string;
	text: string;
}
