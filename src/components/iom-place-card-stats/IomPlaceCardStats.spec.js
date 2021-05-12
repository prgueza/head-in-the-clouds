import IomPlaceCardStats from "./IomPlaceCardStats";
import { shallow } from "enzyme";

const defaultProps = () => ({
  isLoading: false,
  rainChance: { value: 50, units: "%" },
  temperature: {
    current: { value: 10, units: "ºC" },
    min: { value: 0, units: "ºC" },
    max: { value: 100, units: "ºC" },
  },
  rainPredictions: { values: [10, 20, 30, 40], units: "%" },
});

const createWrapper = (props) => {
  return shallow(<IomPlaceCardStats {...defaultProps()} {...props} />);
};

describe("IomPlaceCardStats test suite", () => {
  describe(":isLoading | Sets and unsets the component loading status", () => {
    test("The loading property is passed down to the Stats elements", () => {
      const customProps = { isLoading: true };
      const wrapper = createWrapper(customProps);
      const EuiStatsComponents = wrapper.find("EuiStat");
      EuiStatsComponents.forEach((w) => expect(w.prop("isLoading")).toBe(true));
    });

    test("When loading the text nodes inside the Stats are empty", () => {
      const wrapper = createWrapper({ isLoading: true });
      const EuiStatsTextComponent = wrapper.find("EuiText");
      EuiStatsTextComponent.forEach((w) =>
        expect(w.find("div").exists()).toBe(false)
      );
    });
  });

  describe(":temperature | Displays the current temperature and the max and min temperatures for the day", () => {
    test("The current temperature is mapped to the first Stat title and displays its units", () => {
      const { current } = defaultProps().temperature;
      const wrapper = createWrapper();
      const EuiStatsComponent = wrapper.find("EuiStat").at(0);
      expect(EuiStatsComponent.prop("description")).toBe("Temperature");
      expect(EuiStatsComponent.prop("title")).toContain(current.value);
      expect(EuiStatsComponent.prop("title")).toContain(current.units);
    });

    test("The min and max temperatures for the day are displayed within the Stat component", () => {
      const { max, min } = defaultProps().temperature;
      const wrapper = createWrapper();
      const SubtitleSpans = wrapper
        .find(".iom-place-card__stat-subtitle")
        .at(0)
        .find("span");
      expect(SubtitleSpans.at(0).text()).toContain(max.value);
      expect(SubtitleSpans.at(0).text()).toContain(max.units);
      expect(SubtitleSpans.at(1).text()).toContain(min.value);
      expect(SubtitleSpans.at(1).text()).toContain(min.units);
    });
  });

  describe(":rainChance | Displays the rain chance and the maximun chance for the day", () => {
    test("The current rain chance is mapped to the second Stat title and displays its units", () => {
      const { units, value } = defaultProps().rainChance;
      const wrapper = createWrapper();
      const EuiStatsComponent = wrapper.find("EuiStat").at(1);
      expect(EuiStatsComponent.prop("description")).toBe("Rain chance");
      expect(EuiStatsComponent.prop("title")).toContain(value);
      expect(EuiStatsComponent.prop("title")).toContain(units);
    });
  });

  describe(":rainPredictions | The maximum predicted rain chance is displayed underneath the current rain chance", () => {
    test("The maximun rain chance is displayed within the Stat component", () => {
      const { values, units } = defaultProps().rainPredictions;
      const wrapper = createWrapper();
      const SubtitleSpans = wrapper
        .find(".iom-place-card__stat-subtitle")
        .at(1)
        .find("span");
      expect(SubtitleSpans.at(0).text()).toContain(Math.max(...values));
      expect(SubtitleSpans.at(0).text()).toContain(units);
      expect(SubtitleSpans.at(0).text()).toContain("(max)");
    });

    test("When no probabilities are present the component must display '-'", () => {
      const wrapper = createWrapper({ rainPredictions: { values: [] } });
      const SubtitleSpans = wrapper
        .find(".iom-place-card__stat-subtitle")
        .at(1)
        .find("span");
      expect(SubtitleSpans.at(0).text()).toContain("-");
    });
  });
});
