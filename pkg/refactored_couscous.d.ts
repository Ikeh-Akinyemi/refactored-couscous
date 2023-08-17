/* tslint:disable */
/* eslint-disable */
/**
*/
export class Index {
  free(): void;
/**
*/
  constructor();
/**
* @param {string} s
*/
  add(s: string): void;
/**
* @param {string} query
* @returns {Array<any>}
*/
  search(query: string): Array<any>;
}
/**
*/
export class Token {
  free(): void;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_token_free: (a: number) => void;
  readonly __wbg_index_free: (a: number) => void;
  readonly index_new: () => number;
  readonly index_add: (a: number, b: number, c: number) => void;
  readonly index_search: (a: number, b: number, c: number) => number;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {SyncInitInput} module
*
* @returns {InitOutput}
*/
export function initSync(module: SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
