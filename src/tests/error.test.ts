/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import ERR_BAD_REQUEST from '../../src/exceptions/appErrors/ERR_BAD_REQUEST';
import ERR_INTERNAL_SERVER_ERROR from '../../src/exceptions/appErrors/ERR_INTERNAL_SERVER_ERROR';
import ERR_NOT_FOUND from '../../src/exceptions/appErrors/ERR_NOT_FOUND';
import ERR_NO_CONTENT from '../../src/exceptions/appErrors/ERR_NO_CONTENT';
import ERR_UNAUTHORIZED_ACCESS from '../../src/exceptions/appErrors/ERR_UNAUTHORIZED_ACCESS';
import {
  isTypicalAppError,
  isTypicalHasuraError,
} from '../../src/exceptions/throwErr';

import { expect } from 'chai';
import { describe, it } from 'mocha';

describe('App Error Tests', () => {
  // the tests container
  it('checking default errors', () => {
    // the single test

    const error: any[] = [
      {
        extensions: {
          path: '$.selectionSet.insert_point.args.objects',
          code: 'constraint-violation',
        },
        message:
          'Uniqueness violation. duplicate key value violates unique constraint "point_user_id_post_id_key"',
      },
      {
        extensions: {
          path: '$.selectionSet.insert_point.args.objects',
          code: 'constraint-violation',
        },
        message:
          'Uniqueness violation. duplicate key value violates unique constraint "point_user_id_post_id_key"',
      },
    ];
    expect(isTypicalAppError(ERR_NOT_FOUND)).to.be.true; // Do I need to explain anything? It's like writing in English!
    expect(isTypicalAppError(ERR_BAD_REQUEST)).to.be.true; // Do I need to explain anything? It's like writing in English!
    expect(isTypicalAppError(ERR_INTERNAL_SERVER_ERROR)).to.be.true; // Do I need to explain anything? It's like writing in English!
    expect(isTypicalAppError(ERR_NO_CONTENT)).to.be.true; // Do I need to explain anything? It's like writing in English!
    expect(isTypicalAppError(ERR_UNAUTHORIZED_ACCESS)).to.be.true; // Do I need to explain anything? It's like writing in English!

    expect(isTypicalHasuraError(error)).to.be.true; // Do I need to explain anything? It's like writing in English!
  });
});
