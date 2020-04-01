/**
 * If url=https://foo.com:8080/api/charge
 *    then api=https://foo.com:8080/api
 *
 * to create a url:
 *    const url = `${cfg.api}/charge`
 *
 * To add env vars while starting dev server"
 *    REACT_APP_API=http://localhost/api yarn start
 *    REACT_APP_API=http://localhost/api yarn build
 *
 *    api should NEVER end with a slash
 */
import {ensure} from './util/ssutil';

export const api: string = ensure(process.env.REACT_APP_API);