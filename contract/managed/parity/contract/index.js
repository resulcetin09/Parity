import * as __compactRuntime from '@midnight-ntwrk/compact-runtime';
__compactRuntime.checkRuntimeVersion('0.16.0');

export var Phase;
(function (Phase) {
  Phase[Phase['committing'] = 0] = 'committing';
  Phase[Phase['checking'] = 1] = 'checking';
  Phase[Phase['proving'] = 2] = 'proving';
})(Phase || (Phase = {}));

export var DisputeKind;
(function (DisputeKind) {
  DisputeKind[DisputeKind['payAmount'] = 0] = 'payAmount';
  DisputeKind[DisputeKind['category'] = 1] = 'category';
  DisputeKind[DisputeKind['gender'] = 2] = 'gender';
  DisputeKind[DisputeKind['missing'] = 3] = 'missing';
})(DisputeKind || (DisputeKind = {}));

const _descriptor_0 = new __compactRuntime.CompactTypeBytes(32);

const _descriptor_1 = __compactRuntime.CompactTypeBoolean;

const _descriptor_2 = new __compactRuntime.CompactTypeUnsignedInteger(255n, 1);

const _descriptor_3 = new __compactRuntime.CompactTypeUnsignedInteger(18446744073709551615n, 8);

class _CategoryResult_0 {
  alignment() {
    return _descriptor_2.alignment().concat(_descriptor_2.alignment().concat(_descriptor_3.alignment().concat(_descriptor_3.alignment())));
  }
  fromValue(value_0) {
    return {
      women: _descriptor_2.fromValue(value_0),
      men: _descriptor_2.fromValue(value_0),
      womenPay: _descriptor_3.fromValue(value_0),
      menPay: _descriptor_3.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_2.toValue(value_0.women).concat(_descriptor_2.toValue(value_0.men).concat(_descriptor_3.toValue(value_0.womenPay).concat(_descriptor_3.toValue(value_0.menPay))));
  }
}

const _descriptor_4 = new _CategoryResult_0();

const _descriptor_5 = new __compactRuntime.CompactTypeEnum(2, 1);

const _descriptor_6 = new __compactRuntime.CompactTypeUnsignedInteger(65535n, 2);

const _descriptor_7 = __compactRuntime.CompactTypeField;

class _MerkleTreeDigest_0 {
  alignment() {
    return _descriptor_7.alignment();
  }
  fromValue(value_0) {
    return {
      field: _descriptor_7.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_7.toValue(value_0.field);
  }
}

const _descriptor_8 = new _MerkleTreeDigest_0();

const _descriptor_9 = new __compactRuntime.CompactTypeEnum(3, 1);

const _descriptor_10 = new __compactRuntime.CompactTypeVector(16, _descriptor_0);

const _descriptor_11 = new __compactRuntime.CompactTypeUnsignedInteger(4294967295n, 4);

class _PayRecord_0 {
  alignment() {
    return _descriptor_1.alignment().concat(_descriptor_1.alignment().concat(_descriptor_11.alignment().concat(_descriptor_0.alignment())));
  }
  fromValue(value_0) {
    return {
      present: _descriptor_1.fromValue(value_0),
      woman: _descriptor_1.fromValue(value_0),
      pay: _descriptor_11.fromValue(value_0),
      salt: _descriptor_0.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_1.toValue(value_0.present).concat(_descriptor_1.toValue(value_0.woman).concat(_descriptor_11.toValue(value_0.pay).concat(_descriptor_0.toValue(value_0.salt))));
  }
}

const _descriptor_12 = new _PayRecord_0();

const _descriptor_13 = new __compactRuntime.CompactTypeVector(16, _descriptor_12);

const _descriptor_14 = new __compactRuntime.CompactTypeVector(8, _descriptor_0);

const _descriptor_15 = new __compactRuntime.CompactTypeVector(4, _descriptor_0);

const _descriptor_16 = new __compactRuntime.CompactTypeVector(2, _descriptor_0);

class _MerkleTreePathEntry_0 {
  alignment() {
    return _descriptor_8.alignment().concat(_descriptor_1.alignment());
  }
  fromValue(value_0) {
    return {
      sibling: _descriptor_8.fromValue(value_0),
      goes_left: _descriptor_1.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_8.toValue(value_0.sibling).concat(_descriptor_1.toValue(value_0.goes_left));
  }
}

const _descriptor_17 = new _MerkleTreePathEntry_0();

const _descriptor_18 = new __compactRuntime.CompactTypeVector(10, _descriptor_17);

class _MerkleTreePath_0 {
  alignment() {
    return _descriptor_0.alignment().concat(_descriptor_18.alignment());
  }
  fromValue(value_0) {
    return {
      leaf: _descriptor_0.fromValue(value_0),
      path: _descriptor_18.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.leaf).concat(_descriptor_18.toValue(value_0.path));
  }
}

const _descriptor_19 = new _MerkleTreePath_0();

const _descriptor_20 = new __compactRuntime.CompactTypeBytes(6);

class _LeafPreimage_0 {
  alignment() {
    return _descriptor_20.alignment().concat(_descriptor_0.alignment());
  }
  fromValue(value_0) {
    return {
      domain_sep: _descriptor_20.fromValue(value_0),
      data: _descriptor_0.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_20.toValue(value_0.domain_sep).concat(_descriptor_0.toValue(value_0.data));
  }
}

const _descriptor_21 = new _LeafPreimage_0();

const _descriptor_22 = new __compactRuntime.CompactTypeVector(2, _descriptor_7);

const _descriptor_23 = new __compactRuntime.CompactTypeVector(3, _descriptor_0);

class _Either_0 {
  alignment() {
    return _descriptor_1.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment()));
  }
  fromValue(value_0) {
    return {
      is_left: _descriptor_1.fromValue(value_0),
      left: _descriptor_0.fromValue(value_0),
      right: _descriptor_0.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_1.toValue(value_0.is_left).concat(_descriptor_0.toValue(value_0.left).concat(_descriptor_0.toValue(value_0.right)));
  }
}

const _descriptor_24 = new _Either_0();

const _descriptor_25 = new __compactRuntime.CompactTypeUnsignedInteger(340282366920938463463374607431768211455n, 16);

class _ContractAddress_0 {
  alignment() {
    return _descriptor_0.alignment();
  }
  fromValue(value_0) {
    return {
      bytes: _descriptor_0.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.bytes);
  }
}

const _descriptor_26 = new _ContractAddress_0();

export class Contract {
  witnesses;
  constructor(...args_0) {
    if (args_0.length !== 1) {
      throw new __compactRuntime.CompactError(`Contract constructor: expected 1 argument, received ${args_0.length}`);
    }
    const witnesses_0 = args_0[0];
    if (typeof(witnesses_0) !== 'object') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor is not an object');
    }
    if (typeof(witnesses_0.organizerSecret) !== 'function') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor does not contain a function-valued field named organizerSecret');
    }
    if (typeof(witnesses_0.employeeSecret) !== 'function') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor does not contain a function-valued field named employeeSecret');
    }
    if (typeof(witnesses_0.credentialPath) !== 'function') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor does not contain a function-valued field named credentialPath');
    }
    if (typeof(witnesses_0.categoryRecords) !== 'function') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor does not contain a function-valued field named categoryRecords');
    }
    this.witnesses = witnesses_0;
    this.circuits = {
      organizerCommitment(context, ...args_1) {
        return { result: pureCircuits.organizerCommitment(...args_1), context };
      },
      credentialCommitment(context, ...args_1) {
        return { result: pureCircuits.credentialCommitment(...args_1), context };
      },
      disputeNullifier(context, ...args_1) {
        return { result: pureCircuits.disputeNullifier(...args_1), context };
      },
      recordLeaf(context, ...args_1) {
        return { result: pureCircuits.recordLeaf(...args_1), context };
      },
      node(context, ...args_1) {
        return { result: pureCircuits.node(...args_1), context };
      },
      payrollRoot(context, ...args_1) {
        return { result: pureCircuits.payrollRoot(...args_1), context };
      },
      registerEmployees: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`registerEmployees: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const batch_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('registerEmployees',
                                     'argument 1 (as invoked from Typescript)',
                                     'parity.compact line 101 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(Array.isArray(batch_0) && batch_0.length === 16 && batch_0.every((t) => t.buffer instanceof ArrayBuffer && t.BYTES_PER_ELEMENT === 1 && t.length === 32))) {
          __compactRuntime.typeError('registerEmployees',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'parity.compact line 101 char 1',
                                     'Vector<16, Bytes<32>>',
                                     batch_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_10.toValue(batch_0),
            alignment: _descriptor_10.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._registerEmployees_0(context,
                                                   partialProofData,
                                                   batch_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      commitCategory: (...args_1) => {
        if (args_1.length !== 3) {
          throw new __compactRuntime.CompactError(`commitCategory: expected 3 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const category_0 = args_1[1];
        const root_0 = args_1[2];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('commitCategory',
                                     'argument 1 (as invoked from Typescript)',
                                     'parity.compact line 115 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(category_0.buffer instanceof ArrayBuffer && category_0.BYTES_PER_ELEMENT === 1 && category_0.length === 32)) {
          __compactRuntime.typeError('commitCategory',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'parity.compact line 115 char 1',
                                     'Bytes<32>',
                                     category_0)
        }
        if (!(root_0.buffer instanceof ArrayBuffer && root_0.BYTES_PER_ELEMENT === 1 && root_0.length === 32)) {
          __compactRuntime.typeError('commitCategory',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'parity.compact line 115 char 1',
                                     'Bytes<32>',
                                     root_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(category_0).concat(_descriptor_0.toValue(root_0)),
            alignment: _descriptor_0.alignment().concat(_descriptor_0.alignment())
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._commitCategory_0(context,
                                                partialProofData,
                                                category_0,
                                                root_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      openCheckWindow: (...args_1) => {
        if (args_1.length !== 1) {
          throw new __compactRuntime.CompactError(`openCheckWindow: expected 1 argument (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('openCheckWindow',
                                     'argument 1 (as invoked from Typescript)',
                                     'parity.compact line 121 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: { value: [], alignment: [] },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._openCheckWindow_0(context, partialProofData);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      fileDispute: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`fileDispute: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const kind_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('fileDispute',
                                     'argument 1 (as invoked from Typescript)',
                                     'parity.compact line 128 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(typeof(kind_0) === 'number' && kind_0 >= 0 && kind_0 <= 3)) {
          __compactRuntime.typeError('fileDispute',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'parity.compact line 128 char 1',
                                     'Enum<DisputeKind, payAmount, category, gender, missing>',
                                     kind_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_9.toValue(kind_0),
            alignment: _descriptor_9.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._fileDispute_0(context, partialProofData, kind_0);
        partialProofData.output = { value: _descriptor_0.toValue(result_0), alignment: _descriptor_0.alignment() };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      resolveDispute: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`resolveDispute: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const nullifier_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('resolveDispute',
                                     'argument 1 (as invoked from Typescript)',
                                     'parity.compact line 143 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(nullifier_0.buffer instanceof ArrayBuffer && nullifier_0.BYTES_PER_ELEMENT === 1 && nullifier_0.length === 32)) {
          __compactRuntime.typeError('resolveDispute',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'parity.compact line 143 char 1',
                                     'Bytes<32>',
                                     nullifier_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(nullifier_0),
            alignment: _descriptor_0.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._resolveDispute_0(context,
                                                partialProofData,
                                                nullifier_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      closeCheckWindow: (...args_1) => {
        if (args_1.length !== 1) {
          throw new __compactRuntime.CompactError(`closeCheckWindow: expected 1 argument (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('closeCheckWindow',
                                     'argument 1 (as invoked from Typescript)',
                                     'parity.compact line 150 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: { value: [], alignment: [] },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._closeCheckWindow_0(context, partialProofData);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      publishCategory: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`publishCategory: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const category_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('publishCategory',
                                     'argument 1 (as invoked from Typescript)',
                                     'parity.compact line 157 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(category_0.buffer instanceof ArrayBuffer && category_0.BYTES_PER_ELEMENT === 1 && category_0.length === 32)) {
          __compactRuntime.typeError('publishCategory',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'parity.compact line 157 char 1',
                                     'Bytes<32>',
                                     category_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(category_0),
            alignment: _descriptor_0.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._publishCategory_0(context,
                                                 partialProofData,
                                                 category_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      }
    };
    this.impureCircuits = {
      registerEmployees: this.circuits.registerEmployees,
      commitCategory: this.circuits.commitCategory,
      openCheckWindow: this.circuits.openCheckWindow,
      fileDispute: this.circuits.fileDispute,
      resolveDispute: this.circuits.resolveDispute,
      closeCheckWindow: this.circuits.closeCheckWindow,
      publishCategory: this.circuits.publishCategory
    };
    this.provableCircuits = {
      registerEmployees: this.circuits.registerEmployees,
      commitCategory: this.circuits.commitCategory,
      openCheckWindow: this.circuits.openCheckWindow,
      fileDispute: this.circuits.fileDispute,
      resolveDispute: this.circuits.resolveDispute,
      closeCheckWindow: this.circuits.closeCheckWindow,
      publishCategory: this.circuits.publishCategory
    };
  }
  initialState(...args_0) {
    if (args_0.length !== 3) {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 3 arguments (as invoked from Typescript), received ${args_0.length}`);
    }
    const constructorContext_0 = args_0[0];
    const reportPeriod_0 = args_0[1];
    const authority_0 = args_0[2];
    if (typeof(constructorContext_0) !== 'object') {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'constructorContext' in argument 1 (as invoked from Typescript) to be an object`);
    }
    if (!('initialPrivateState' in constructorContext_0)) {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'initialPrivateState' in argument 1 (as invoked from Typescript)`);
    }
    if (!('initialZswapLocalState' in constructorContext_0)) {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'initialZswapLocalState' in argument 1 (as invoked from Typescript)`);
    }
    if (typeof(constructorContext_0.initialZswapLocalState) !== 'object') {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'initialZswapLocalState' in argument 1 (as invoked from Typescript) to be an object`);
    }
    if (!(reportPeriod_0.buffer instanceof ArrayBuffer && reportPeriod_0.BYTES_PER_ELEMENT === 1 && reportPeriod_0.length === 32)) {
      __compactRuntime.typeError('Contract state constructor',
                                 'argument 1 (argument 2 as invoked from Typescript)',
                                 'parity.compact line 51 char 1',
                                 'Bytes<32>',
                                 reportPeriod_0)
    }
    if (!(authority_0.buffer instanceof ArrayBuffer && authority_0.BYTES_PER_ELEMENT === 1 && authority_0.length === 32)) {
      __compactRuntime.typeError('Contract state constructor',
                                 'argument 2 (argument 3 as invoked from Typescript)',
                                 'parity.compact line 51 char 1',
                                 'Bytes<32>',
                                 authority_0)
    }
    const state_0 = new __compactRuntime.ContractState();
    let stateValue_0 = __compactRuntime.StateValue.newArray();
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    state_0.data = new __compactRuntime.ChargedState(stateValue_0);
    state_0.setOperation('registerEmployees', new __compactRuntime.ContractOperation());
    state_0.setOperation('commitCategory', new __compactRuntime.ContractOperation());
    state_0.setOperation('openCheckWindow', new __compactRuntime.ContractOperation());
    state_0.setOperation('fileDispute', new __compactRuntime.ContractOperation());
    state_0.setOperation('resolveDispute', new __compactRuntime.ContractOperation());
    state_0.setOperation('closeCheckWindow', new __compactRuntime.ContractOperation());
    state_0.setOperation('publishCategory', new __compactRuntime.ContractOperation());
    const context = __compactRuntime.createCircuitContext(__compactRuntime.dummyContractAddress(), constructorContext_0.initialZswapLocalState.coinPublicKey, state_0.data, constructorContext_0.initialPrivateState);
    const partialProofData = {
      input: { value: [], alignment: [] },
      output: undefined,
      publicTranscript: [],
      privateTranscriptOutputs: []
    };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(0n),
                                                                                              alignment: _descriptor_2.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(new Uint8Array(32)),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(1n),
                                                                                              alignment: _descriptor_2.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(new Uint8Array(32)),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(2n),
                                                                                              alignment: _descriptor_2.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_5.toValue(0),
                                                                                              alignment: _descriptor_5.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(3n),
                                                                                              alignment: _descriptor_2.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newArray()
                                                          .arrayPush(__compactRuntime.StateValue.newBoundedMerkleTree(
                                                                       new __compactRuntime.StateBoundedMerkleTree(10)
                                                                     )).arrayPush(__compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(0n),
                                                                                                                        alignment: _descriptor_3.alignment() }))
                                                          .encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(4n),
                                                                                              alignment: _descriptor_2.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(5n),
                                                                                              alignment: _descriptor_2.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(6n),
                                                                                              alignment: _descriptor_2.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(7n),
                                                                                              alignment: _descriptor_2.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(8n),
                                                                                              alignment: _descriptor_2.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(0n),
                                                                                              alignment: _descriptor_3.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(9n),
                                                                                              alignment: _descriptor_2.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(10n),
                                                                                              alignment: _descriptor_2.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(0n),
                                                                                              alignment: _descriptor_2.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(reportPeriod_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(1n),
                                                                                              alignment: _descriptor_2.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(authority_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(2n),
                                                                                              alignment: _descriptor_2.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_5.toValue(0),
                                                                                              alignment: _descriptor_5.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    state_0.data = new __compactRuntime.ChargedState(context.currentQueryContext.state.state);
    return {
      currentContractState: state_0,
      currentPrivateState: context.currentPrivateState,
      currentZswapLocalState: context.currentZswapLocalState
    }
  }
  _merkleTreePathRoot_0(path_0) {
    return { field:
               this._folder_0((...args_0) =>
                                this._merkleTreePathEntryRoot_0(...args_0),
                              this._degradeToTransient_0(this._persistentHash_3({ domain_sep:
                                                                                    new Uint8Array([109, 100, 110, 58, 108, 104]),
                                                                                  data:
                                                                                    path_0.leaf })),
                              path_0.path) };
  }
  _merkleTreePathEntryRoot_0(recursiveDigest_0, entry_0) {
    const left_0 = entry_0.goes_left ? recursiveDigest_0 : entry_0.sibling.field;
    const right_0 = entry_0.goes_left ?
                    entry_0.sibling.field :
                    recursiveDigest_0;
    return this._transientHash_0([left_0, right_0]);
  }
  _transientHash_0(value_0) {
    const result_0 = __compactRuntime.transientHash(_descriptor_22, value_0);
    return result_0;
  }
  _persistentHash_0(value_0) {
    const result_0 = __compactRuntime.persistentHash(_descriptor_23, value_0);
    return result_0;
  }
  _persistentHash_1(value_0) {
    const result_0 = __compactRuntime.persistentHash(_descriptor_12, value_0);
    return result_0;
  }
  _persistentHash_2(value_0) {
    const result_0 = __compactRuntime.persistentHash(_descriptor_16, value_0);
    return result_0;
  }
  _persistentHash_3(value_0) {
    const result_0 = __compactRuntime.persistentHash(_descriptor_21, value_0);
    return result_0;
  }
  _degradeToTransient_0(x_0) {
    const result_0 = __compactRuntime.degradeToTransient(x_0);
    return result_0;
  }
  _organizerSecret_0(context, partialProofData) {
    const witnessContext_0 = __compactRuntime.createWitnessContext(ledger(context.currentQueryContext.state), context.currentPrivateState, context.currentQueryContext.address);
    const [nextPrivateState_0, result_0] = this.witnesses.organizerSecret(witnessContext_0);
    context.currentPrivateState = nextPrivateState_0;
    if (!(result_0.buffer instanceof ArrayBuffer && result_0.BYTES_PER_ELEMENT === 1 && result_0.length === 32)) {
      __compactRuntime.typeError('organizerSecret',
                                 'return value',
                                 'parity.compact line 46 char 1',
                                 'Bytes<32>',
                                 result_0)
    }
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_0.toValue(result_0),
      alignment: _descriptor_0.alignment()
    });
    return result_0;
  }
  _employeeSecret_0(context, partialProofData) {
    const witnessContext_0 = __compactRuntime.createWitnessContext(ledger(context.currentQueryContext.state), context.currentPrivateState, context.currentQueryContext.address);
    const [nextPrivateState_0, result_0] = this.witnesses.employeeSecret(witnessContext_0);
    context.currentPrivateState = nextPrivateState_0;
    if (!(result_0.buffer instanceof ArrayBuffer && result_0.BYTES_PER_ELEMENT === 1 && result_0.length === 32)) {
      __compactRuntime.typeError('employeeSecret',
                                 'return value',
                                 'parity.compact line 47 char 1',
                                 'Bytes<32>',
                                 result_0)
    }
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_0.toValue(result_0),
      alignment: _descriptor_0.alignment()
    });
    return result_0;
  }
  _credentialPath_0(context, partialProofData, leaf_0) {
    const witnessContext_0 = __compactRuntime.createWitnessContext(ledger(context.currentQueryContext.state), context.currentPrivateState, context.currentQueryContext.address);
    const [nextPrivateState_0, result_0] = this.witnesses.credentialPath(witnessContext_0,
                                                                         leaf_0);
    context.currentPrivateState = nextPrivateState_0;
    if (!(typeof(result_0) === 'object' && result_0.leaf.buffer instanceof ArrayBuffer && result_0.leaf.BYTES_PER_ELEMENT === 1 && result_0.leaf.length === 32 && Array.isArray(result_0.path) && result_0.path.length === 10 && result_0.path.every((t) => typeof(t) === 'object' && typeof(t.sibling) === 'object' && typeof(t.sibling.field) === 'bigint' && t.sibling.field >= 0 && t.sibling.field <= __compactRuntime.MAX_FIELD && typeof(t.goes_left) === 'boolean'))) {
      __compactRuntime.typeError('credentialPath',
                                 'return value',
                                 'parity.compact line 48 char 1',
                                 'struct MerkleTreePath<leaf: Bytes<32>, path: Vector<10, struct MerkleTreePathEntry<sibling: struct MerkleTreeDigest<field: Field>, goes_left: Boolean>>>',
                                 result_0)
    }
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_19.toValue(result_0),
      alignment: _descriptor_19.alignment()
    });
    return result_0;
  }
  _categoryRecords_0(context, partialProofData, category_0) {
    const witnessContext_0 = __compactRuntime.createWitnessContext(ledger(context.currentQueryContext.state), context.currentPrivateState, context.currentQueryContext.address);
    const [nextPrivateState_0, result_0] = this.witnesses.categoryRecords(witnessContext_0,
                                                                          category_0);
    context.currentPrivateState = nextPrivateState_0;
    if (!(Array.isArray(result_0) && result_0.length === 16 && result_0.every((t) => typeof(t) === 'object' && typeof(t.present) === 'boolean' && typeof(t.woman) === 'boolean' && typeof(t.pay) === 'bigint' && t.pay >= 0n && t.pay <= 4294967295n && t.salt.buffer instanceof ArrayBuffer && t.salt.BYTES_PER_ELEMENT === 1 && t.salt.length === 32))) {
      __compactRuntime.typeError('categoryRecords',
                                 'return value',
                                 'parity.compact line 49 char 1',
                                 'Vector<16, struct PayRecord<present: Boolean, woman: Boolean, pay: Uint<0..4294967296>, salt: Bytes<32>>>',
                                 result_0)
    }
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_13.toValue(result_0),
      alignment: _descriptor_13.alignment()
    });
    return result_0;
  }
  _organizerCommitment_0(secret_0) {
    return this._persistentHash_2([new Uint8Array([112, 97, 114, 105, 116, 121, 58, 111, 114, 103, 97, 110, 105, 122, 101, 114, 58, 118, 49, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
                                   secret_0]);
  }
  _credentialCommitment_0(reportPeriod_0, secret_0) {
    return this._persistentHash_0([new Uint8Array([112, 97, 114, 105, 116, 121, 58, 101, 109, 112, 108, 111, 121, 101, 101, 58, 118, 49, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
                                   reportPeriod_0,
                                   secret_0]);
  }
  _disputeNullifier_0(reportPeriod_0, secret_0) {
    return this._persistentHash_0([new Uint8Array([112, 97, 114, 105, 116, 121, 58, 100, 105, 115, 112, 117, 116, 101, 58, 118, 49, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
                                   reportPeriod_0,
                                   secret_0]);
  }
  _recordLeaf_0(record_0) { return this._persistentHash_1(record_0); }
  _node_0(left_0, right_0) { return this._persistentHash_2([left_0, right_0]); }
  _level8_0(v_0) {
    return [this._node_0(v_0[0], v_0[1]),
            this._node_0(v_0[2], v_0[3]),
            this._node_0(v_0[4], v_0[5]),
            this._node_0(v_0[6], v_0[7]),
            this._node_0(v_0[8], v_0[9]),
            this._node_0(v_0[10], v_0[11]),
            this._node_0(v_0[12], v_0[13]),
            this._node_0(v_0[14], v_0[15])];
  }
  _level4_0(v_0) {
    return [this._node_0(v_0[0], v_0[1]),
            this._node_0(v_0[2], v_0[3]),
            this._node_0(v_0[4], v_0[5]),
            this._node_0(v_0[6], v_0[7])];
  }
  _level2_0(v_0) {
    return [this._node_0(v_0[0], v_0[1]), this._node_0(v_0[2], v_0[3])];
  }
  _payrollRoot_0(records_0) {
    const top_0 = this._level2_0(this._level4_0(this._level8_0(this._mapper_0((...args_0) =>
                                                                                this._recordLeaf_0(...args_0),
                                                                              records_0))));
    return this._node_0(top_0[0], top_0[1]);
  }
  _requireOrganizer_0(context, partialProofData) {
    __compactRuntime.assert(this._equal_0(this._organizerCommitment_0(this._organizerSecret_0(context,
                                                                                              partialProofData)),
                                          _descriptor_0.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                    partialProofData,
                                                                                                    [
                                                                                                     { dup: { n: 0 } },
                                                                                                     { idx: { cached: false,
                                                                                                              pushPath: false,
                                                                                                              path: [
                                                                                                                     { tag: 'value',
                                                                                                                       value: { value: _descriptor_2.toValue(1n),
                                                                                                                                alignment: _descriptor_2.alignment() } }] } },
                                                                                                     { popeq: { cached: false,
                                                                                                                result: undefined } }]).value)),
                            'Organizer authorization required');
    return [];
  }
  _registerEmployees_0(context, partialProofData, batch_0) {
    this._requireOrganizer_0(context, partialProofData);
    __compactRuntime.assert(_descriptor_5.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_2.toValue(2n),
                                                                                                                  alignment: _descriptor_2.alignment() } }] } },
                                                                                       { popeq: { cached: false,
                                                                                                  result: undefined } }]).value)
                            ===
                            0,
                            'Employee registration is closed');
    this._folder_1(context,
                   partialProofData,
                   ((context, partialProofData, t_0, commitment_0) =>
                    {
                      if (!this._equal_1(commitment_0, new Uint8Array(32))) {
                        __compactRuntime.assert(!_descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                           partialProofData,
                                                                                                           [
                                                                                                            { dup: { n: 0 } },
                                                                                                            { idx: { cached: false,
                                                                                                                     pushPath: false,
                                                                                                                     path: [
                                                                                                                            { tag: 'value',
                                                                                                                              value: { value: _descriptor_2.toValue(4n),
                                                                                                                                       alignment: _descriptor_2.alignment() } }] } },
                                                                                                            { push: { storage: false,
                                                                                                                      value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(commitment_0),
                                                                                                                                                                   alignment: _descriptor_0.alignment() }).encode() } },
                                                                                                            'member',
                                                                                                            { popeq: { cached: true,
                                                                                                                       result: undefined } }]).value),
                                                'Employee already registered');
                        __compactRuntime.queryLedgerState(context,
                                                          partialProofData,
                                                          [
                                                           { idx: { cached: false,
                                                                    pushPath: true,
                                                                    path: [
                                                                           { tag: 'value',
                                                                             value: { value: _descriptor_2.toValue(3n),
                                                                                      alignment: _descriptor_2.alignment() } }] } },
                                                           { idx: { cached: false,
                                                                    pushPath: true,
                                                                    path: [
                                                                           { tag: 'value',
                                                                             value: { value: _descriptor_2.toValue(0n),
                                                                                      alignment: _descriptor_2.alignment() } }] } },
                                                           { dup: { n: 2 } },
                                                           { idx: { cached: false,
                                                                    pushPath: false,
                                                                    path: [
                                                                           { tag: 'value',
                                                                             value: { value: _descriptor_2.toValue(1n),
                                                                                      alignment: _descriptor_2.alignment() } }] } },
                                                           { push: { storage: true,
                                                                     value: __compactRuntime.StateValue.newCell(__compactRuntime.leafHash(
                                                                                                                  { value: _descriptor_0.toValue(commitment_0),
                                                                                                                    alignment: _descriptor_0.alignment() }
                                                                                                                )).encode() } },
                                                           { ins: { cached: false,
                                                                    n: 1 } },
                                                           { ins: { cached: true,
                                                                    n: 1 } },
                                                           { idx: { cached: false,
                                                                    pushPath: true,
                                                                    path: [
                                                                           { tag: 'value',
                                                                             value: { value: _descriptor_2.toValue(1n),
                                                                                      alignment: _descriptor_2.alignment() } }] } },
                                                           { addi: { immediate: 1 } },
                                                           { ins: { cached: true,
                                                                    n: 2 } }]);
                        __compactRuntime.queryLedgerState(context,
                                                          partialProofData,
                                                          [
                                                           { idx: { cached: false,
                                                                    pushPath: true,
                                                                    path: [
                                                                           { tag: 'value',
                                                                             value: { value: _descriptor_2.toValue(4n),
                                                                                      alignment: _descriptor_2.alignment() } }] } },
                                                           { push: { storage: false,
                                                                     value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(commitment_0),
                                                                                                                  alignment: _descriptor_0.alignment() }).encode() } },
                                                           { push: { storage: true,
                                                                     value: __compactRuntime.StateValue.newNull().encode() } },
                                                           { ins: { cached: false,
                                                                    n: 1 } },
                                                           { ins: { cached: true,
                                                                    n: 1 } }]);
                      }
                      return t_0;
                    }),
                   [],
                   batch_0);
    return [];
  }
  _commitCategory_0(context, partialProofData, category_0, root_0) {
    this._requireOrganizer_0(context, partialProofData);
    __compactRuntime.assert(_descriptor_5.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_2.toValue(2n),
                                                                                                                  alignment: _descriptor_2.alignment() } }] } },
                                                                                       { popeq: { cached: false,
                                                                                                  result: undefined } }]).value)
                            !==
                            2,
                            'Payroll is frozen for proving');
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_2.toValue(5n),
                                                                  alignment: _descriptor_2.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(category_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(root_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _openCheckWindow_0(context, partialProofData) {
    this._requireOrganizer_0(context, partialProofData);
    __compactRuntime.assert(_descriptor_5.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_2.toValue(2n),
                                                                                                                  alignment: _descriptor_2.alignment() } }] } },
                                                                                       { popeq: { cached: false,
                                                                                                  result: undefined } }]).value)
                            ===
                            0,
                            'The check window was already opened');
    __compactRuntime.assert(!_descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                       partialProofData,
                                                                                       [
                                                                                        { dup: { n: 0 } },
                                                                                        { idx: { cached: false,
                                                                                                 pushPath: false,
                                                                                                 path: [
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_2.toValue(5n),
                                                                                                                   alignment: _descriptor_2.alignment() } }] } },
                                                                                        'size',
                                                                                        { push: { storage: false,
                                                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(0n),
                                                                                                                                               alignment: _descriptor_3.alignment() }).encode() } },
                                                                                        'eq',
                                                                                        { popeq: { cached: true,
                                                                                                   result: undefined } }]).value),
                            'Commit at least one category first');
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(2n),
                                                                                              alignment: _descriptor_2.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_5.toValue(1),
                                                                                              alignment: _descriptor_5.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    return [];
  }
  _fileDispute_0(context, partialProofData, kind_0) {
    __compactRuntime.assert(_descriptor_5.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_2.toValue(2n),
                                                                                                                  alignment: _descriptor_2.alignment() } }] } },
                                                                                       { popeq: { cached: false,
                                                                                                  result: undefined } }]).value)
                            ===
                            1,
                            'Disputes are only accepted while employees check');
    const secret_0 = this._employeeSecret_0(context, partialProofData);
    const leaf_0 = this._credentialCommitment_0(_descriptor_0.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                          partialProofData,
                                                                                                          [
                                                                                                           { dup: { n: 0 } },
                                                                                                           { idx: { cached: false,
                                                                                                                    pushPath: false,
                                                                                                                    path: [
                                                                                                                           { tag: 'value',
                                                                                                                             value: { value: _descriptor_2.toValue(0n),
                                                                                                                                      alignment: _descriptor_2.alignment() } }] } },
                                                                                                           { popeq: { cached: false,
                                                                                                                      result: undefined } }]).value),
                                                secret_0);
    const path_0 = this._credentialPath_0(context, partialProofData, leaf_0);
    __compactRuntime.assert(this._equal_2(path_0.leaf, leaf_0),
                            'Credential path does not match employee');
    let tmp_0;
    __compactRuntime.assert((tmp_0 = this._merkleTreePathRoot_0(path_0),
                             _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                       partialProofData,
                                                                                       [
                                                                                        { dup: { n: 0 } },
                                                                                        { idx: { cached: false,
                                                                                                 pushPath: false,
                                                                                                 path: [
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_2.toValue(3n),
                                                                                                                   alignment: _descriptor_2.alignment() } }] } },
                                                                                        { idx: { cached: false,
                                                                                                 pushPath: false,
                                                                                                 path: [
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_2.toValue(0n),
                                                                                                                   alignment: _descriptor_2.alignment() } }] } },
                                                                                        'root',
                                                                                        { push: { storage: false,
                                                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_8.toValue(tmp_0),
                                                                                                                                               alignment: _descriptor_8.alignment() }).encode() } },
                                                                                        'eq',
                                                                                        { popeq: { cached: true,
                                                                                                   result: undefined } }]).value)),
                            'Not a registered employee');
    const nullifier_0 = this._disputeNullifier_0(_descriptor_0.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                           partialProofData,
                                                                                                           [
                                                                                                            { dup: { n: 0 } },
                                                                                                            { idx: { cached: false,
                                                                                                                     pushPath: false,
                                                                                                                     path: [
                                                                                                                            { tag: 'value',
                                                                                                                              value: { value: _descriptor_2.toValue(0n),
                                                                                                                                       alignment: _descriptor_2.alignment() } }] } },
                                                                                                            { popeq: { cached: false,
                                                                                                                       result: undefined } }]).value),
                                                 secret_0);
    __compactRuntime.assert(!_descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                       partialProofData,
                                                                                       [
                                                                                        { dup: { n: 0 } },
                                                                                        { idx: { cached: false,
                                                                                                 pushPath: false,
                                                                                                 path: [
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_2.toValue(6n),
                                                                                                                   alignment: _descriptor_2.alignment() } }] } },
                                                                                        { push: { storage: false,
                                                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(nullifier_0),
                                                                                                                                               alignment: _descriptor_0.alignment() }).encode() } },
                                                                                        'member',
                                                                                        { popeq: { cached: true,
                                                                                                   result: undefined } }]).value),
                            'Already disputed this report');
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_2.toValue(6n),
                                                                  alignment: _descriptor_2.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(nullifier_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_9.toValue(kind_0),
                                                                                              alignment: _descriptor_9.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_2.toValue(7n),
                                                                  alignment: _descriptor_2.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(nullifier_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newNull().encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return nullifier_0;
  }
  _resolveDispute_0(context, partialProofData, nullifier_0) {
    this._requireOrganizer_0(context, partialProofData);
    __compactRuntime.assert(_descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_2.toValue(7n),
                                                                                                                  alignment: _descriptor_2.alignment() } }] } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(nullifier_0),
                                                                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                                                                       'member',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'No open dispute with this reference');
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_2.toValue(7n),
                                                                  alignment: _descriptor_2.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(nullifier_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { rem: { cached: false } },
                                       { ins: { cached: true, n: 1 } }]);
    const tmp_0 = 1n;
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_2.toValue(8n),
                                                                  alignment: _descriptor_2.alignment() } }] } },
                                       { addi: { immediate: parseInt(__compactRuntime.valueToBigInt(
                                                              { value: _descriptor_6.toValue(tmp_0),
                                                                alignment: _descriptor_6.alignment() }
                                                                .value
                                                            )) } },
                                       { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _closeCheckWindow_0(context, partialProofData) {
    this._requireOrganizer_0(context, partialProofData);
    __compactRuntime.assert(_descriptor_5.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_2.toValue(2n),
                                                                                                                  alignment: _descriptor_2.alignment() } }] } },
                                                                                       { popeq: { cached: false,
                                                                                                  result: undefined } }]).value)
                            ===
                            1,
                            'The check window is not open');
    __compactRuntime.assert(_descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_2.toValue(7n),
                                                                                                                  alignment: _descriptor_2.alignment() } }] } },
                                                                                       'size',
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(0n),
                                                                                                                                              alignment: _descriptor_3.alignment() }).encode() } },
                                                                                       'eq',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'Resolve every open dispute first');
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(2n),
                                                                                              alignment: _descriptor_2.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_5.toValue(2),
                                                                                              alignment: _descriptor_5.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    return [];
  }
  _publishCategory_0(context, partialProofData, category_0) {
    this._requireOrganizer_0(context, partialProofData);
    __compactRuntime.assert(_descriptor_5.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_2.toValue(2n),
                                                                                                                  alignment: _descriptor_2.alignment() } }] } },
                                                                                       { popeq: { cached: false,
                                                                                                  result: undefined } }]).value)
                            ===
                            2,
                            'Close the check window before proving');
    __compactRuntime.assert(_descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_2.toValue(5n),
                                                                                                                  alignment: _descriptor_2.alignment() } }] } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(category_0),
                                                                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                                                                       'member',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'Category was never committed');
    __compactRuntime.assert(!_descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                       partialProofData,
                                                                                       [
                                                                                        { dup: { n: 0 } },
                                                                                        { idx: { cached: false,
                                                                                                 pushPath: false,
                                                                                                 path: [
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_2.toValue(9n),
                                                                                                                   alignment: _descriptor_2.alignment() } }] } },
                                                                                        { push: { storage: false,
                                                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(category_0),
                                                                                                                                               alignment: _descriptor_0.alignment() }).encode() } },
                                                                                        'member',
                                                                                        { popeq: { cached: true,
                                                                                                   result: undefined } }]).value)
                            &&
                            !_descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                       partialProofData,
                                                                                       [
                                                                                        { dup: { n: 0 } },
                                                                                        { idx: { cached: false,
                                                                                                 pushPath: false,
                                                                                                 path: [
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_2.toValue(10n),
                                                                                                                   alignment: _descriptor_2.alignment() } }] } },
                                                                                        { push: { storage: false,
                                                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(category_0),
                                                                                                                                               alignment: _descriptor_0.alignment() }).encode() } },
                                                                                        'member',
                                                                                        { popeq: { cached: true,
                                                                                                   result: undefined } }]).value),
                            'Category already published');
    const records_0 = this._categoryRecords_0(context,
                                              partialProofData,
                                              category_0);
    __compactRuntime.assert(this._equal_3(this._payrollRoot_0(records_0),
                                          _descriptor_0.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                    partialProofData,
                                                                                                    [
                                                                                                     { dup: { n: 0 } },
                                                                                                     { idx: { cached: false,
                                                                                                              pushPath: false,
                                                                                                              path: [
                                                                                                                     { tag: 'value',
                                                                                                                       value: { value: _descriptor_2.toValue(5n),
                                                                                                                                alignment: _descriptor_2.alignment() } }] } },
                                                                                                     { idx: { cached: false,
                                                                                                              pushPath: false,
                                                                                                              path: [
                                                                                                                     { tag: 'value',
                                                                                                                       value: { value: _descriptor_0.toValue(category_0),
                                                                                                                                alignment: _descriptor_0.alignment() } }] } },
                                                                                                     { popeq: { cached: false,
                                                                                                                result: undefined } }]).value)),
                            'Records do not match the committed payroll');
    const women_0 = this._folder_2(context,
                                   partialProofData,
                                   ((context, partialProofData, acc_0, r_0) =>
                                    {
                                      return ((t1) => {
                                               if (t1 > 255n) {
                                                 throw new __compactRuntime.CompactError('parity.compact line 166 char 5: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 255');
                                               }
                                               return t1;
                                             })(r_0.present && r_0.woman ?
                                                acc_0 + 1n :
                                                acc_0);
                                    }),
                                   0n,
                                   records_0);
    const men_0 = this._folder_3(context,
                                 partialProofData,
                                 ((context, partialProofData, acc_1, r_1) =>
                                  {
                                    return ((t1) => {
                                             if (t1 > 255n) {
                                               throw new __compactRuntime.CompactError('parity.compact line 168 char 5: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 255');
                                             }
                                             return t1;
                                           })(r_1.present && !r_1.woman ?
                                              acc_1 + 1n :
                                              acc_1);
                                  }),
                                 0n,
                                 records_0);
    const womenPay_0 = this._folder_4(context,
                                      partialProofData,
                                      ((context, partialProofData, acc_2, r_2) =>
                                       {
                                         return ((t1) => {
                                                  if (t1 > 18446744073709551615n) {
                                                    throw new __compactRuntime.CompactError('parity.compact line 170 char 5: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 18446744073709551615');
                                                  }
                                                  return t1;
                                                })(r_2.present && r_2.woman ?
                                                   acc_2 + r_2.pay :
                                                   acc_2);
                                       }),
                                      0n,
                                      records_0);
    const menPay_0 = this._folder_5(context,
                                    partialProofData,
                                    ((context, partialProofData, acc_3, r_3) =>
                                     {
                                       return ((t1) => {
                                                if (t1 > 18446744073709551615n) {
                                                  throw new __compactRuntime.CompactError('parity.compact line 172 char 5: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 18446744073709551615');
                                                }
                                                return t1;
                                              })(r_3.present && !r_3.woman ?
                                                 acc_3 + r_3.pay :
                                                 acc_3);
                                     }),
                                    0n,
                                    records_0);
    if (women_0 >= 5n && men_0 >= 5n) {
      const tmp_0 = { women: women_0,
                      men: men_0,
                      womenPay: womenPay_0,
                      menPay: menPay_0 };
      __compactRuntime.queryLedgerState(context,
                                        partialProofData,
                                        [
                                         { idx: { cached: false,
                                                  pushPath: true,
                                                  path: [
                                                         { tag: 'value',
                                                           value: { value: _descriptor_2.toValue(9n),
                                                                    alignment: _descriptor_2.alignment() } }] } },
                                         { push: { storage: false,
                                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(category_0),
                                                                                                alignment: _descriptor_0.alignment() }).encode() } },
                                         { push: { storage: true,
                                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(tmp_0),
                                                                                                alignment: _descriptor_4.alignment() }).encode() } },
                                         { ins: { cached: false, n: 1 } },
                                         { ins: { cached: true, n: 1 } }]);
    } else {
      __compactRuntime.queryLedgerState(context,
                                        partialProofData,
                                        [
                                         { idx: { cached: false,
                                                  pushPath: true,
                                                  path: [
                                                         { tag: 'value',
                                                           value: { value: _descriptor_2.toValue(10n),
                                                                    alignment: _descriptor_2.alignment() } }] } },
                                         { push: { storage: false,
                                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(category_0),
                                                                                                alignment: _descriptor_0.alignment() }).encode() } },
                                         { push: { storage: true,
                                                   value: __compactRuntime.StateValue.newNull().encode() } },
                                         { ins: { cached: false, n: 1 } },
                                         { ins: { cached: true, n: 1 } }]);
    }
    return [];
  }
  _folder_0(f, x, a0) {
    for (let i = 0; i < 10; i++) { x = f(x, a0[i]); }
    return x;
  }
  _mapper_0(f, a0) {
    let a = [];
    for (let i = 0; i < 16; i++) { a[i] = f(a0[i]); }
    return a;
  }
  _equal_0(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_1(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _folder_1(context, partialProofData, f, x, a0) {
    for (let i = 0; i < 16; i++) { x = f(context, partialProofData, x, a0[i]); }
    return x;
  }
  _equal_2(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_3(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _folder_2(context, partialProofData, f, x, a0) {
    for (let i = 0; i < 16; i++) { x = f(context, partialProofData, x, a0[i]); }
    return x;
  }
  _folder_3(context, partialProofData, f, x, a0) {
    for (let i = 0; i < 16; i++) { x = f(context, partialProofData, x, a0[i]); }
    return x;
  }
  _folder_4(context, partialProofData, f, x, a0) {
    for (let i = 0; i < 16; i++) { x = f(context, partialProofData, x, a0[i]); }
    return x;
  }
  _folder_5(context, partialProofData, f, x, a0) {
    for (let i = 0; i < 16; i++) { x = f(context, partialProofData, x, a0[i]); }
    return x;
  }
}
export function ledger(stateOrChargedState) {
  const state = stateOrChargedState instanceof __compactRuntime.StateValue ? stateOrChargedState : stateOrChargedState.state;
  const chargedState = stateOrChargedState instanceof __compactRuntime.StateValue ? new __compactRuntime.ChargedState(stateOrChargedState) : stateOrChargedState;
  const context = {
    currentQueryContext: new __compactRuntime.QueryContext(chargedState, __compactRuntime.dummyContractAddress()),
    costModel: __compactRuntime.CostModel.initialCostModel()
  };
  const partialProofData = {
    input: { value: [], alignment: [] },
    output: undefined,
    publicTranscript: [],
    privateTranscriptOutputs: []
  };
  return {
    get period() {
      return _descriptor_0.fromValue(__compactRuntime.queryLedgerState(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_2.toValue(0n),
                                                                                                   alignment: _descriptor_2.alignment() } }] } },
                                                                        { popeq: { cached: false,
                                                                                   result: undefined } }]).value);
    },
    get organizer() {
      return _descriptor_0.fromValue(__compactRuntime.queryLedgerState(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_2.toValue(1n),
                                                                                                   alignment: _descriptor_2.alignment() } }] } },
                                                                        { popeq: { cached: false,
                                                                                   result: undefined } }]).value);
    },
    get phase() {
      return _descriptor_5.fromValue(__compactRuntime.queryLedgerState(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_2.toValue(2n),
                                                                                                   alignment: _descriptor_2.alignment() } }] } },
                                                                        { popeq: { cached: false,
                                                                                   result: undefined } }]).value);
    },
    employees: {
      isFull(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isFull: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_2.toValue(3n),
                                                                                                     alignment: _descriptor_2.alignment() } }] } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_2.toValue(1n),
                                                                                                     alignment: _descriptor_2.alignment() } }] } },
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(1024n),
                                                                                                                                 alignment: _descriptor_3.alignment() }).encode() } },
                                                                          'lt',
                                                                          'neg',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      checkRoot(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`checkRoot: expected 1 argument, received ${args_0.length}`);
        }
        const rt_0 = args_0[0];
        if (!(typeof(rt_0) === 'object' && typeof(rt_0.field) === 'bigint' && rt_0.field >= 0 && rt_0.field <= __compactRuntime.MAX_FIELD)) {
          __compactRuntime.typeError('checkRoot',
                                     'argument 1',
                                     'parity.compact line 37 char 1',
                                     'struct MerkleTreeDigest<field: Field>',
                                     rt_0)
        }
        return _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_2.toValue(3n),
                                                                                                     alignment: _descriptor_2.alignment() } }] } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_2.toValue(0n),
                                                                                                     alignment: _descriptor_2.alignment() } }] } },
                                                                          'root',
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_8.toValue(rt_0),
                                                                                                                                 alignment: _descriptor_8.alignment() }).encode() } },
                                                                          'eq',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      root(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`root: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[3];
        return ((result) => result             ? __compactRuntime.CompactTypeMerkleTreeDigest.fromValue(result)             : undefined)(self_0.asArray()[0].asBoundedMerkleTree().rehash().root()?.value);
      },
      firstFree(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`first_free: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[3];
        return __compactRuntime.CompactTypeField.fromValue(self_0.asArray()[1].asCell().value);
      },
      pathForLeaf(...args_0) {
        if (args_0.length !== 2) {
          throw new __compactRuntime.CompactError(`path_for_leaf: expected 2 arguments, received ${args_0.length}`);
        }
        const index_0 = args_0[0];
        const leaf_0 = args_0[1];
        if (!(typeof(index_0) === 'bigint' && index_0 >= 0 && index_0 <= __compactRuntime.MAX_FIELD)) {
          __compactRuntime.typeError('path_for_leaf',
                                     'argument 1',
                                     'parity.compact line 37 char 1',
                                     'Field',
                                     index_0)
        }
        if (!(leaf_0.buffer instanceof ArrayBuffer && leaf_0.BYTES_PER_ELEMENT === 1 && leaf_0.length === 32)) {
          __compactRuntime.typeError('path_for_leaf',
                                     'argument 2',
                                     'parity.compact line 37 char 1',
                                     'Bytes<32>',
                                     leaf_0)
        }
        const self_0 = state.asArray()[3];
        return ((result) => result             ? new __compactRuntime.CompactTypeMerkleTreePath(10, _descriptor_0).fromValue(result)             : undefined)(  self_0.asArray()[0].asBoundedMerkleTree().rehash().pathForLeaf(    index_0,    {      value: _descriptor_0.toValue(leaf_0),      alignment: _descriptor_0.alignment()    }  )?.value);
      },
      findPathForLeaf(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`find_path_for_leaf: expected 1 argument, received ${args_0.length}`);
        }
        const leaf_0 = args_0[0];
        if (!(leaf_0.buffer instanceof ArrayBuffer && leaf_0.BYTES_PER_ELEMENT === 1 && leaf_0.length === 32)) {
          __compactRuntime.typeError('find_path_for_leaf',
                                     'argument 1',
                                     'parity.compact line 37 char 1',
                                     'Bytes<32>',
                                     leaf_0)
        }
        const self_0 = state.asArray()[3];
        return ((result) => result             ? new __compactRuntime.CompactTypeMerkleTreePath(10, _descriptor_0).fromValue(result)             : undefined)(  self_0.asArray()[0].asBoundedMerkleTree().rehash().findPathForLeaf(    {      value: _descriptor_0.toValue(leaf_0),      alignment: _descriptor_0.alignment()    }  )?.value);
      }
    },
    registered: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_2.toValue(4n),
                                                                                                     alignment: _descriptor_2.alignment() } }] } },
                                                                          'size',
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(0n),
                                                                                                                                 alignment: _descriptor_3.alignment() }).encode() } },
                                                                          'eq',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_3.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_2.toValue(4n),
                                                                                                     alignment: _descriptor_2.alignment() } }] } },
                                                                          'size',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const elem_0 = args_0[0];
        if (!(elem_0.buffer instanceof ArrayBuffer && elem_0.BYTES_PER_ELEMENT === 1 && elem_0.length === 32)) {
          __compactRuntime.typeError('member',
                                     'argument 1',
                                     'parity.compact line 38 char 1',
                                     'Bytes<32>',
                                     elem_0)
        }
        return _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_2.toValue(4n),
                                                                                                     alignment: _descriptor_2.alignment() } }] } },
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(elem_0),
                                                                                                                                 alignment: _descriptor_0.alignment() }).encode() } },
                                                                          'member',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[4];
        return self_0.asMap().keys().map((elem) => _descriptor_0.fromValue(elem.value))[Symbol.iterator]();
      }
    },
    payroll: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_2.toValue(5n),
                                                                                                     alignment: _descriptor_2.alignment() } }] } },
                                                                          'size',
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(0n),
                                                                                                                                 alignment: _descriptor_3.alignment() }).encode() } },
                                                                          'eq',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_3.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_2.toValue(5n),
                                                                                                     alignment: _descriptor_2.alignment() } }] } },
                                                                          'size',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.typeError('member',
                                     'argument 1',
                                     'parity.compact line 39 char 1',
                                     'Bytes<32>',
                                     key_0)
        }
        return _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_2.toValue(5n),
                                                                                                     alignment: _descriptor_2.alignment() } }] } },
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(key_0),
                                                                                                                                 alignment: _descriptor_0.alignment() }).encode() } },
                                                                          'member',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.typeError('lookup',
                                     'argument 1',
                                     'parity.compact line 39 char 1',
                                     'Bytes<32>',
                                     key_0)
        }
        return _descriptor_0.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_2.toValue(5n),
                                                                                                     alignment: _descriptor_2.alignment() } }] } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_0.toValue(key_0),
                                                                                                     alignment: _descriptor_0.alignment() } }] } },
                                                                          { popeq: { cached: false,
                                                                                     result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[5];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_0.fromValue(key.value),      _descriptor_0.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    },
    disputes: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_2.toValue(6n),
                                                                                                     alignment: _descriptor_2.alignment() } }] } },
                                                                          'size',
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(0n),
                                                                                                                                 alignment: _descriptor_3.alignment() }).encode() } },
                                                                          'eq',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_3.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_2.toValue(6n),
                                                                                                     alignment: _descriptor_2.alignment() } }] } },
                                                                          'size',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.typeError('member',
                                     'argument 1',
                                     'parity.compact line 40 char 1',
                                     'Bytes<32>',
                                     key_0)
        }
        return _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_2.toValue(6n),
                                                                                                     alignment: _descriptor_2.alignment() } }] } },
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(key_0),
                                                                                                                                 alignment: _descriptor_0.alignment() }).encode() } },
                                                                          'member',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.typeError('lookup',
                                     'argument 1',
                                     'parity.compact line 40 char 1',
                                     'Bytes<32>',
                                     key_0)
        }
        return _descriptor_9.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_2.toValue(6n),
                                                                                                     alignment: _descriptor_2.alignment() } }] } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_0.toValue(key_0),
                                                                                                     alignment: _descriptor_0.alignment() } }] } },
                                                                          { popeq: { cached: false,
                                                                                     result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[6];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_0.fromValue(key.value),      _descriptor_9.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    },
    openDisputes: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_2.toValue(7n),
                                                                                                     alignment: _descriptor_2.alignment() } }] } },
                                                                          'size',
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(0n),
                                                                                                                                 alignment: _descriptor_3.alignment() }).encode() } },
                                                                          'eq',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_3.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_2.toValue(7n),
                                                                                                     alignment: _descriptor_2.alignment() } }] } },
                                                                          'size',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const elem_0 = args_0[0];
        if (!(elem_0.buffer instanceof ArrayBuffer && elem_0.BYTES_PER_ELEMENT === 1 && elem_0.length === 32)) {
          __compactRuntime.typeError('member',
                                     'argument 1',
                                     'parity.compact line 41 char 1',
                                     'Bytes<32>',
                                     elem_0)
        }
        return _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_2.toValue(7n),
                                                                                                     alignment: _descriptor_2.alignment() } }] } },
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(elem_0),
                                                                                                                                 alignment: _descriptor_0.alignment() }).encode() } },
                                                                          'member',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[7];
        return self_0.asMap().keys().map((elem) => _descriptor_0.fromValue(elem.value))[Symbol.iterator]();
      }
    },
    get resolvedDisputes() {
      return _descriptor_3.fromValue(__compactRuntime.queryLedgerState(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_2.toValue(8n),
                                                                                                   alignment: _descriptor_2.alignment() } }] } },
                                                                        { popeq: { cached: true,
                                                                                   result: undefined } }]).value);
    },
    results: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_2.toValue(9n),
                                                                                                     alignment: _descriptor_2.alignment() } }] } },
                                                                          'size',
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(0n),
                                                                                                                                 alignment: _descriptor_3.alignment() }).encode() } },
                                                                          'eq',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_3.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_2.toValue(9n),
                                                                                                     alignment: _descriptor_2.alignment() } }] } },
                                                                          'size',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.typeError('member',
                                     'argument 1',
                                     'parity.compact line 43 char 1',
                                     'Bytes<32>',
                                     key_0)
        }
        return _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_2.toValue(9n),
                                                                                                     alignment: _descriptor_2.alignment() } }] } },
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(key_0),
                                                                                                                                 alignment: _descriptor_0.alignment() }).encode() } },
                                                                          'member',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.typeError('lookup',
                                     'argument 1',
                                     'parity.compact line 43 char 1',
                                     'Bytes<32>',
                                     key_0)
        }
        return _descriptor_4.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_2.toValue(9n),
                                                                                                     alignment: _descriptor_2.alignment() } }] } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_0.toValue(key_0),
                                                                                                     alignment: _descriptor_0.alignment() } }] } },
                                                                          { popeq: { cached: false,
                                                                                     result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[9];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_0.fromValue(key.value),      _descriptor_4.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    },
    withheld: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_2.toValue(10n),
                                                                                                     alignment: _descriptor_2.alignment() } }] } },
                                                                          'size',
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(0n),
                                                                                                                                 alignment: _descriptor_3.alignment() }).encode() } },
                                                                          'eq',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_3.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_2.toValue(10n),
                                                                                                     alignment: _descriptor_2.alignment() } }] } },
                                                                          'size',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const elem_0 = args_0[0];
        if (!(elem_0.buffer instanceof ArrayBuffer && elem_0.BYTES_PER_ELEMENT === 1 && elem_0.length === 32)) {
          __compactRuntime.typeError('member',
                                     'argument 1',
                                     'parity.compact line 44 char 1',
                                     'Bytes<32>',
                                     elem_0)
        }
        return _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_2.toValue(10n),
                                                                                                     alignment: _descriptor_2.alignment() } }] } },
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(elem_0),
                                                                                                                                 alignment: _descriptor_0.alignment() }).encode() } },
                                                                          'member',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[10];
        return self_0.asMap().keys().map((elem) => _descriptor_0.fromValue(elem.value))[Symbol.iterator]();
      }
    }
  };
}
const _emptyContext = {
  currentQueryContext: new __compactRuntime.QueryContext(new __compactRuntime.ContractState().data, __compactRuntime.dummyContractAddress())
};
const _dummyContract = new Contract({
  organizerSecret: (...args) => undefined,
  employeeSecret: (...args) => undefined,
  credentialPath: (...args) => undefined,
  categoryRecords: (...args) => undefined
});
export const pureCircuits = {
  organizerCommitment: (...args_0) => {
    if (args_0.length !== 1) {
      throw new __compactRuntime.CompactError(`organizerCommitment: expected 1 argument (as invoked from Typescript), received ${args_0.length}`);
    }
    const secret_0 = args_0[0];
    if (!(secret_0.buffer instanceof ArrayBuffer && secret_0.BYTES_PER_ELEMENT === 1 && secret_0.length === 32)) {
      __compactRuntime.typeError('organizerCommitment',
                                 'argument 1',
                                 'parity.compact line 57 char 1',
                                 'Bytes<32>',
                                 secret_0)
    }
    return _dummyContract._organizerCommitment_0(secret_0);
  },
  credentialCommitment: (...args_0) => {
    if (args_0.length !== 2) {
      throw new __compactRuntime.CompactError(`credentialCommitment: expected 2 arguments (as invoked from Typescript), received ${args_0.length}`);
    }
    const reportPeriod_0 = args_0[0];
    const secret_0 = args_0[1];
    if (!(reportPeriod_0.buffer instanceof ArrayBuffer && reportPeriod_0.BYTES_PER_ELEMENT === 1 && reportPeriod_0.length === 32)) {
      __compactRuntime.typeError('credentialCommitment',
                                 'argument 1',
                                 'parity.compact line 61 char 1',
                                 'Bytes<32>',
                                 reportPeriod_0)
    }
    if (!(secret_0.buffer instanceof ArrayBuffer && secret_0.BYTES_PER_ELEMENT === 1 && secret_0.length === 32)) {
      __compactRuntime.typeError('credentialCommitment',
                                 'argument 2',
                                 'parity.compact line 61 char 1',
                                 'Bytes<32>',
                                 secret_0)
    }
    return _dummyContract._credentialCommitment_0(reportPeriod_0, secret_0);
  },
  disputeNullifier: (...args_0) => {
    if (args_0.length !== 2) {
      throw new __compactRuntime.CompactError(`disputeNullifier: expected 2 arguments (as invoked from Typescript), received ${args_0.length}`);
    }
    const reportPeriod_0 = args_0[0];
    const secret_0 = args_0[1];
    if (!(reportPeriod_0.buffer instanceof ArrayBuffer && reportPeriod_0.BYTES_PER_ELEMENT === 1 && reportPeriod_0.length === 32)) {
      __compactRuntime.typeError('disputeNullifier',
                                 'argument 1',
                                 'parity.compact line 65 char 1',
                                 'Bytes<32>',
                                 reportPeriod_0)
    }
    if (!(secret_0.buffer instanceof ArrayBuffer && secret_0.BYTES_PER_ELEMENT === 1 && secret_0.length === 32)) {
      __compactRuntime.typeError('disputeNullifier',
                                 'argument 2',
                                 'parity.compact line 65 char 1',
                                 'Bytes<32>',
                                 secret_0)
    }
    return _dummyContract._disputeNullifier_0(reportPeriod_0, secret_0);
  },
  recordLeaf: (...args_0) => {
    if (args_0.length !== 1) {
      throw new __compactRuntime.CompactError(`recordLeaf: expected 1 argument (as invoked from Typescript), received ${args_0.length}`);
    }
    const record_0 = args_0[0];
    if (!(typeof(record_0) === 'object' && typeof(record_0.present) === 'boolean' && typeof(record_0.woman) === 'boolean' && typeof(record_0.pay) === 'bigint' && record_0.pay >= 0n && record_0.pay <= 4294967295n && record_0.salt.buffer instanceof ArrayBuffer && record_0.salt.BYTES_PER_ELEMENT === 1 && record_0.salt.length === 32)) {
      __compactRuntime.typeError('recordLeaf',
                                 'argument 1',
                                 'parity.compact line 69 char 1',
                                 'struct PayRecord<present: Boolean, woman: Boolean, pay: Uint<0..4294967296>, salt: Bytes<32>>',
                                 record_0)
    }
    return _dummyContract._recordLeaf_0(record_0);
  },
  node: (...args_0) => {
    if (args_0.length !== 2) {
      throw new __compactRuntime.CompactError(`node: expected 2 arguments (as invoked from Typescript), received ${args_0.length}`);
    }
    const left_0 = args_0[0];
    const right_0 = args_0[1];
    if (!(left_0.buffer instanceof ArrayBuffer && left_0.BYTES_PER_ELEMENT === 1 && left_0.length === 32)) {
      __compactRuntime.typeError('node',
                                 'argument 1',
                                 'parity.compact line 73 char 1',
                                 'Bytes<32>',
                                 left_0)
    }
    if (!(right_0.buffer instanceof ArrayBuffer && right_0.BYTES_PER_ELEMENT === 1 && right_0.length === 32)) {
      __compactRuntime.typeError('node',
                                 'argument 2',
                                 'parity.compact line 73 char 1',
                                 'Bytes<32>',
                                 right_0)
    }
    return _dummyContract._node_0(left_0, right_0);
  },
  payrollRoot: (...args_0) => {
    if (args_0.length !== 1) {
      throw new __compactRuntime.CompactError(`payrollRoot: expected 1 argument (as invoked from Typescript), received ${args_0.length}`);
    }
    const records_0 = args_0[0];
    if (!(Array.isArray(records_0) && records_0.length === 16 && records_0.every((t) => typeof(t) === 'object' && typeof(t.present) === 'boolean' && typeof(t.woman) === 'boolean' && typeof(t.pay) === 'bigint' && t.pay >= 0n && t.pay <= 4294967295n && t.salt.buffer instanceof ArrayBuffer && t.salt.BYTES_PER_ELEMENT === 1 && t.salt.length === 32))) {
      __compactRuntime.typeError('payrollRoot',
                                 'argument 1',
                                 'parity.compact line 90 char 1',
                                 'Vector<16, struct PayRecord<present: Boolean, woman: Boolean, pay: Uint<0..4294967296>, salt: Bytes<32>>>',
                                 records_0)
    }
    return _dummyContract._payrollRoot_0(records_0);
  }
};
export const contractReferenceLocations =
  { tag: 'publicLedgerArray', indices: { } };
//# sourceMappingURL=index.js.map
