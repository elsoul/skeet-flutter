'use strict'
/**
 * Browser Firestore adaptor.
 */
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value)
          })
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod
    var result = {}
    if (mod != null)
      for (var k in mod)
        if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k]
    result['default'] = mod
    return result
  }
Object.defineProperty(exports, '__esModule', { value: true })
const firebase = __importStar(require('firebase/app'))
require('firebase/firestore')
const utils_1 = require('../utils')
function adaptor() {
  return __awaiter(this, void 0, void 0, function* () {
    const firestore = firebase.firestore()
    // At the moment, the browser's Firestore adaptor doesn't support getAll.
    // Get rid of the fallback when the issue is closed:
    // https://github.com/firebase/firebase-js-sdk/issues/1176
    if (!('getAll' in firestore))
      Object.assign(firestore, { getAll: utils_1.getAll })
    return {
      firestore,
      consts: {
        DocumentReference: firebase.firestore.DocumentReference,
        Timestamp: firebase.firestore.Timestamp,
        FieldPath: firebase.firestore.FieldPath,
        FieldValue: firebase.firestore.FieldValue
      },
      getDocMeta: (snapshot) => ({
        fromCache: snapshot.metadata.fromCache,
        hasPendingWrites: snapshot.metadata.hasPendingWrites
      })
    }
  })
}
exports.default = adaptor
function injectAdaptor() {
  throw new Error(
    'Injecting adaptor is not supported in the browser environment'
  )
}
exports.injectAdaptor = injectAdaptor
//# sourceMappingURL=index.js.map
