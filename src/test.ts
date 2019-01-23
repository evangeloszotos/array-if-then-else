import isFunction from 'is-function';
import arrayIfThenElse from './index';
import { errorMessages } from './ErrorMessages';

interface Bat {
  name: string;
  age: number;
}

const elem0: string = 'Bat';
const elem1: number = 23;
const nightWing: Bat = { name: 'Nightwing', age: 23 };
const batty: Bat = {
  name: 'Batty',
  age: 19,
};

const nightWingDouble: Bat = {
  name: nightWing.name,
  age: 23,
};

const elem3: string = 'Unicorn';

const validInArg = [elem0, elem1, nightWing];

const inValidArgString: any = 'someInputValue';
const inValidArgNumber: any = 1;
const inValidArgObject: any = { field: 'value' };

const thenValue: string = 'thenValue';
const elseValue: string = 'elseValue';

describe('exported module', () => {
  it('is not null', () => {
    expect(arrayIfThenElse).not.toBe(null);
    expect(arrayIfThenElse).not.toBe(undefined);
    expect(arrayIfThenElse).not.toBe(undefined);
  });

  it('is function', () => {
    expect(arrayIfThenElse).toBeDefined();
    expect(isFunction(arrayIfThenElse)).toBe(true);
  });
});

describe('existing primitive searchElement', () => {
  it('is string', () => {
    const result = arrayIfThenElse(validInArg, elem0, thenValue, elseValue);
    expect(result).toBe(thenValue);
  });

  it('is number', () => {
    const result = arrayIfThenElse(validInArg, elem1, thenValue, elseValue);
    expect(result).toBe(thenValue);
  });

  it('is object', () => {
    const result = arrayIfThenElse(validInArg, nightWing, thenValue, elseValue);
    expect(result).toBe(thenValue);
  });

  it('is null', () => {
    const validInArgWithNull = validInArg.slice().concat([null]);
    const result = arrayIfThenElse(
      validInArgWithNull,
      null,
      thenValue,
      elseValue,
    );
    expect(result).toBe(thenValue);
  });

  it('is undefined', () => {
    const validInArgWithUndefined = validInArg.slice().concat([undefined]);
    const result = arrayIfThenElse(
      validInArgWithUndefined,
      undefined,
      thenValue,
      elseValue,
    );
    expect(result).toBe(thenValue);
  });
});

describe('missing primitive searchElement', () => {
  it('is string', () => {
    const result = arrayIfThenElse(validInArg, elem3, thenValue, elseValue);
    expect(result).toBe(elseValue);
  });

  it('is number', () => {
    const result = arrayIfThenElse(validInArg, 2, thenValue, elseValue);
    expect(result).toBe(elseValue);
  });

  it('is object', () => {
    const result = arrayIfThenElse(
      validInArg,
      { ...nightWing },
      thenValue,
      elseValue,
    );
    expect(result).toBe(elseValue);
  });

  it('is object 2', () => {
    const result = arrayIfThenElse(validInArg, batty, thenValue, elseValue);
    expect(result).toBe(elseValue);
  });
});

describe('callback searchElement', () => {
  it('does access property of array element', () => {
    const searchCallback = (item: Bat) => item.name === nightWing.name;
    const result = arrayIfThenElse(
      validInArg,
      searchCallback,
      thenValue,
      elseValue,
    );
    expect(result).toBe(thenValue);
  });

  it('matches nightwing based on its double (matches objects based on values) ', () => {
    const matchWithObject = (item: Bat) => item.name === nightWingDouble.name;

    const result = arrayIfThenElse(
      validInArg,
      matchWithObject,
      thenValue,
      elseValue,
    );
    expect(result).toBe(thenValue);
  });
});

describe('default return values', () => {
  it('(primitive) true on match', () => {
    const result = arrayIfThenElse(validInArg, elem0);
    expect(result).toBe(true);
  });

  it('(primitive) false if no match', () => {
    const result = arrayIfThenElse(validInArg, batty);
    expect(result).toBe(false);
  });

  it('(callback) false if no match', () => {
    const matchWithObject = (item: Bat) => item.name === batty.name;

    const result = arrayIfThenElse(validInArg, matchWithObject);
    expect(result).toBe(false);
  });

  it('(primitive) only thenValue provided | match', () => {
    const result = arrayIfThenElse(validInArg, elem0, thenValue);
    expect(result).toBe(thenValue);
  });

  it('(callback) only thenValue provided | no match', () => {
    const matchWithObject = (item: Bat) => item.name === batty.name;

    const result = arrayIfThenElse(validInArg, matchWithObject, thenValue);
    expect(result).toBe(false);
  });
});

describe('callback should always return boolean', () => {
  it('callback returns true', () => {
    const matchWithObject = (item: Bat) => true;

    const result = arrayIfThenElse(validInArg, matchWithObject);
    expect(result).toBe(true);
  });

  it('callback returns false', () => {
    const matchWithObject = (item: Bat) => false;

    const result = arrayIfThenElse(validInArg, matchWithObject);
    expect(result).toBe(false);
  });

  it('callback returns "Unicorn"', () => {
    expect(() => {
      const matchWithObject = (item: Bat) => 'Unicorn';
      const result = arrayIfThenElse(validInArg, matchWithObject);
    }).toThrow(errorMessages.callbackReturnsNoStrictBoolean);
  });

  it('callback returns 23', () => {
    expect(() => {
      const matchWithObject = (item: Bat) => 23;
      const result = arrayIfThenElse(validInArg, matchWithObject);
    }).toThrow(errorMessages.callbackReturnsNoStrictBoolean);
  });
  it('callback returns {}', () => {
    expect(() => {
      const matchWithObject = (item: Bat) => {};
      const result = arrayIfThenElse(validInArg, matchWithObject);
    }).toThrow(errorMessages.callbackReturnsNoStrictBoolean);
  });
});

describe('first arg is array', () => {
  it('throws if first arg is string', () => {
    expect(() => {
      const result = arrayIfThenElse(
        inValidArgString,
        elem0,
        thenValue,
        elseValue,
      );
    }).toThrow(errorMessages.argumentIsNotAnArray);
  });

  it('throws if first arg is number', () => {
    expect(() => {
      const result = arrayIfThenElse(
        inValidArgNumber,
        elem0,
        thenValue,
        elseValue,
      );
    }).toThrow(errorMessages.argumentIsNotAnArray);
  });

  it('throws if first arg is object', () => {
    expect(() => {
      const result = arrayIfThenElse(
        inValidArgObject,
        elem0,
        thenValue,
        elseValue,
      );
    }).toThrow(errorMessages.argumentIsNotAnArray);
  });
});
