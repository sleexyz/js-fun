// @flow

// uh-oh broken

class Bar<A> { }

type Fix<A> = {
  val: $PropertyType<Fix<Bar<A>>, 'val'>
}

({val: 'hello'}: Fix<null>);


