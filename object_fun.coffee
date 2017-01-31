# refine: creates a function out of an object of functions

_ = require 'lodash'
{assert} = require 'chai'


refine = (mappers) -> (obj) ->
  result = _.clone obj
  for key of mappers
    if key of obj
      result[key] = mappers[key] result[key]
    else
      throw new Error "#{key} not found in #{obj}"
  result


describe 'refine', ->
  it '{} gives identity on objects', ->
    a =
      foo: 'asdf'
      bar: 'asdf'
      baz: 'asdf'
    assert.deepEqual a, refine({}) a

  it 'identities in rows factor through', ->
    a =
      foo: 'asdf'
      bar: 'asdf'
      baz: 'asdf'
    assert.deepEqual a, refine(
      foo: _.identity
    ) a

    assert.deepEqual a, refine(
      foo: _.identity
      bar: _.identity
    ) a

  it 'absence of a key results in noop', ->
    a =
      foo: 'asdf'
      bar: 'asdf'

    assert.deepEqual a, refine(
      baz: _.identity
    ) a
