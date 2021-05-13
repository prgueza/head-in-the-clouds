import collectionsSelector from "./collections";
import { initialState } from "../reducers/collectionsReducer";

describe("Collections selectors test suite", () => {
  test("The collections selectors map the Collections state as expected", () => {
    const collection = { _id: "id" };
    const state = { ...initialState(), list: [collection] };
    const props = { location: { collection } };
    expect(collectionsSelector({ collections: state }, props)).toStrictEqual({
      collectionFromRoute: collection,
      isLoading: state.isLoading,
      collections: state.list,
    });
  });

  test("When the collection from the location doesn't match any collection the selector returns undefined for the collectionFromRoute field", () => {
    const collection = { _id: "id" };
    const state = { ...initialState(), list: [collection] };
    const props = { location: { collection: { _id: "id-2" } } };
    expect(collectionsSelector({ collections: state }, props)).toStrictEqual({
      collectionFromRoute: undefined,
      isLoading: state.isLoading,
      collections: state.list,
    });
  });

  test("When no location prop is not available the selector still works", () => {
    const collection = { _id: "id" };
    const state = { ...initialState(), list: [collection] };
    expect(collectionsSelector({ collections: state })).toStrictEqual({
      collectionFromRoute: undefined,
      isLoading: state.isLoading,
      collections: state.list,
    });
  });

  test("When no location prop is available but doesn't have a collection the selector still works", () => {
    const collection = { _id: "id" };
    const state = { ...initialState(), list: [collection] };
    const props = { location: {} };
    expect(collectionsSelector({ collections: state }, props)).toStrictEqual({
      collectionFromRoute: undefined,
      isLoading: state.isLoading,
      collections: state.list,
    });
  });
});
