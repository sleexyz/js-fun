// @flow

/*
  A life without function composition...
  Is it worth living? :D

  Verdict: Just use Builder, not LazyBuilder, since we can emulate laziness with the thing being built anyways...
*/

// Generic builder interface
interface BuilderLike<A> {
  static lift(x: A): BuilderLike<A>;
  andThen<B>(f: A => B): BuilderLike<B>;
}

class Builder<A> {
  x: A;
  constructor(x: A) {
    this.x = x;
  }
  static lift(x: A): Builder<A> {
    return new Builder(x);
  }
  lower(): A {
    return this.x;
  }
  andThen<B>(f: A => B): Builder<B> {
    return Builder.lift(f(this.x));
  }
}
(Builder: Class<BuilderLike<*>>);


class LazyBuilder<A> {
  x;
  transformers: Array<Function>;

  constructor(x: any, transformers: Array<Function> = []) {
    this.x = x;
    this.transformers = transformers;
  }

  static lift(x: A): LazyBuilder<A> {
    return new LazyBuilder(x);
  }

  lower(): A {
    let result = this.x;
    for (let i = 0; i < this.transformers.length; i++) {
      result = this.transformers[i](result);
    }
    return result;
  }

  andThen<B>(f: A => B): LazyBuilder<B> {
    const newTransformers = this.transformers.slice();
    newTransformers.push(f);
    return new LazyBuilder(
      this.x,
      newTransformers,
    );
  }
}
(LazyBuilder: Class<BuilderLike<*>>);
