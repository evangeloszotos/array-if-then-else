import test from 'ava';
import arrayIfThenElse from './dist';
test('isFunc', t => {
  console.log('HUHU');

  arrayIfThenElse(3,2);


  t.is(1,1, "OK");
});
