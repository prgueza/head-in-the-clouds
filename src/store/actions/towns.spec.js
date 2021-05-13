import C from "../constants";
import townsActions, {
  getTowns,
  getTownsSucceeded,
  getTownsFailed,
  selectTowns,
  queryTowns,
} from "./towns";

describe("Towns Action Creators test suite", () => {
  describe("Actions binding", () => {
    test.each(
      "The actions binder also returns the store dispatch method",
      () => {
        const dispatch = jest.fn();
        const bindedActions = townsActions(dispatch);
        bindedActions.dispatch();
        expect(dispatch).toHaveBeenCalled();
      }
    );

    test.each([["getTowns"], ["selectTowns"], ["queryTowns"]])(
      "The %s action is binded to the dispatch function in order to be dispatched directly",
      (action) => {
        jest.resetAllMocks();
        const dispatch = jest.fn();
        const bindedActions = townsActions(dispatch);
        bindedActions[action]({});
        expect(dispatch).toHaveBeenCalled();
      }
    );
  });

  test("Get Towns action creator returns the TOWNS_FETCH_REQUESTED action", () => {
    const getTownsAction = getTowns();
    expect(getTownsAction).toStrictEqual({
      type: C.TOWNS_FETCH_REQUESTED,
    });
  });

  test("Get Towns Succeeded action creator returns the TOWNS_FETCH_SUCCEEDED action and maps the args to the payload", () => {
    const payload = { towns: [] };
    const getTownsSucceededAction = getTownsSucceeded(payload);
    expect(getTownsSucceededAction).toStrictEqual({
      type: C.TOWNS_FETCH_SUCCEEDED,
      payload,
    });
  });

  test("Get Towns Failed action creator returns the TOWNS_FETCH_FAILED action and maps the args to the payload", () => {
    const payload = { message: "error" };
    const getTownsFailedAction = getTownsFailed(payload);
    expect(getTownsFailedAction).toStrictEqual({
      type: C.TOWNS_FETCH_FAILED,
      payload,
    });
  });

  test("Select Towns action creator returns the TOWNS_SELECTED action and maps the args to the payload", () => {
    const payload = { selectedTowns: [] };
    const selectTownsAction = selectTowns(payload);
    expect(selectTownsAction).toStrictEqual({
      type: C.TOWNS_SELECTED,
      payload,
    });
  });

  test("Query towns action creator returns the TOWNS_QUERIED action and maps the args to the payload", () => {
    const payload = { query: "query" };
    const queryTownsAction = queryTowns(payload);
    expect(queryTownsAction).toStrictEqual({
      type: C.TOWNS_QUERIED,
      payload,
    });
  });
});
