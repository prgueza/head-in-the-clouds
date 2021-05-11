import townsReducer, { initialState } from "./townsReducer";
import C from "../constants";

describe("Towns Reducer test suite", () => {
  test("The default action is to return the state", () => {
    expect(townsReducer(initialState(), {})).toEqual(initialState());
  });

  test(`The reducer sets the isLoading state to true with the ${C.TOWNS_FETCH_REQUESTED} action`, () => {
    const action = { type: C.TOWNS_FETCH_REQUESTED };
    expect(townsReducer(initialState(), action)).toEqual({
      ...initialState(),
      isLoading: true,
    });
  });

  test(`The reducer sets the query state to the query value with the ${C.TOWNS_QUERIED} action`, () => {
    const action = { type: C.TOWNS_QUERIED, payload: { query: "query" } };
    expect(townsReducer(initialState(), action)).toEqual({
      ...initialState(),
      query: "query",
    });
  });

  test(`The reducer sets the selectedTowns state to the selected towns with the ${C.TOWNS_SELECTED} action`, () => {
    const action = {
      type: C.TOWNS_SELECTED,
      payload: { selectedTowns: ["town"] },
    };
    expect(townsReducer(initialState(), action)).toEqual({
      ...initialState(),
      selectedTowns: ["town"],
    });
  });

  test(`The reducer sets the isLoading state to false and loads up the requested towns with the ${C.TOWNS_FETCH_SUCCEEDED} action`, () => {
    const action = {
      type: C.TOWNS_FETCH_SUCCEEDED,
      payload: { towns: ["town"] },
    };
    expect(
      townsReducer({ ...initialState(), isLoading: true }, action)
    ).toEqual({
      ...initialState(),
      isLoading: false,
      towns: ["town"],
    });
  });

  test(`The reducer sets the isLoading state to false and loads up the error message with the ${C.TOWNS_FETCH_FAILED} action`, () => {
    const action = {
      type: C.TOWNS_FETCH_FAILED,
      payload: { message: "error" },
    };
    expect(
      townsReducer({ ...initialState(), isLoading: true }, action)
    ).toEqual({
      ...initialState(),
      isLoading: false,
      error: "error",
    });
  });
});
