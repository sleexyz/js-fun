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

/*
   Other builders:
*/

// Function Builder
class Fun<B, C> {
  f: B => C;
  constructor(f: B => C) {
    this.f = f;
  }
  static lift(f: B => C): Fun<B, C> {
    return new Fun(f);
  }
  lower(): (B => C) {
    return this.f;
  }
  lmap<A>(f: A => B): Fun<A, C> {
    return Fun.lift((x) => this.f(f(x)));
  }
  rmap<D>(f: C => D): Fun<B, D> {
    return Fun.lift((x) => f(this.f(x)));
  }
}

// ReducerBuilder

type Reducer<S, A> = (S, A) => S;
type ReducerMiddleware<S, A> = (next: Reducer<S, *>) => Reducer<S, * | A>;

class ReducerBuilder<S, A> {
  reducer: Reducer<S, A>;
  constructor(reducer: (S, A) => S) {
    this.reducer = reducer;
  }
  static init<S>(): ReducerBuilder<S, empty> {
    return new ReducerBuilder((state, action) => {
      // throw new Error('Not Handled');
      console.error('Not Handled');
      return state;
    });
  }
  get(): Reducer<S, A> {
    return this.reducer;
  }
  register <B>(middleware: ReducerMiddleware<S, B>): ReducerBuilder<S, A | B> {
    const newReducer = middleware(this.reducer);
    (newReducer: Reducer<S, A | B>);
    return new ReducerBuilder(newReducer);
  }
};
