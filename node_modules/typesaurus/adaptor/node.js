'use strict'
/**
 * Node.js Firestore adaptor.
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
const admin = __importStar(require('firebase-admin'))
const adminFirestore = () => admin.firestore()
let currentFirestore = adminFirestore
const adminConsts = {
  DocumentReference: admin.firestore.DocumentReference,
  Timestamp: admin.firestore.Timestamp,
  FieldPath: admin.firestore.FieldPath,
  FieldValue: admin.firestore.FieldValue
}
let currentConsts = adminConsts
function adaptor() {
  return __awaiter(this, void 0, void 0, function* () {
    return {
      firestore: currentFirestore(),
      consts: currentConsts,
      getDocMeta: (_snapshot) => undefined
    }
  })
}
exports.default = adaptor
function injectAdaptor(firestore, consts) {
  currentFirestore = firestore
  currentConsts = consts
}
exports.injectAdaptor = injectAdaptor
//# sourceMappingURL=node.js.map
