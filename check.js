// @flow
declare function check<X>(cls: $Type<X>, inst: X): void;

class A { }
class B extends A { }
class C { }

// check(B, new A);
check(A, new B); 
// check(C, new A);
// check(C, new B);
// check(B, new C);

