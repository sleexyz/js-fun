// @flow

/* const reverse = <A>(xs: Array<A>): Array<A> => {*/
/* const reverse = <T: Array<*> | string>(xs: T): T => {*/
const reverse = <T: *>(xs: T): T => {
  if (typeof xs === 'string') {
    return xs;
  }
  return xs.reverse();
};

/* console.log(reverse([1, 2, 3]));*/
/* console.log(reverse("sdf"));*/
const foo: (Array<number>) = reverse([1, 2, 3]);

type Animal = {age: number}
type Cat = {age: number, name: string};

type ImmutableArray<T> = {
  +val: T
}
const cat: Cat = {age: 2, name: 'kitty'}
const dog: Animal = {age: 3}

const catlist: ImmutableArray<Cat> ={val: cat};
const animallist: ImmutableArray<Animal> ={val: dog};

const printAges = (xs: ImmutableArray<Animal>): void => {
  console.log(xs.val.age);
}
printAges(animallist);
printAges(catlist);
