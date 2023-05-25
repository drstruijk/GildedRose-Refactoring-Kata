import { Item, updateItems } from "@/gilded-rose";

describe("Gilded Rose", () => {
  it("should foo", () => {
    const items = updateItems([new Item("foo", 0, 0, [])]);
    expect(items[0].name).toBe("foo");
  });

  it("should decrease both values by one at the end of a day", () => {
    const items = updateItems([new Item("foo", 2, 2, [])]);
    expect(items[0].sellIn).toBe(1);
    expect(items[0].quality).toBe(1);
  });

  it("Once the sell by date has passed, Quality degrades twice as fast", () => {
    const itemA = new Item("foo", 5, 10, []);
    const itemB = new Item("foo", -1, 10, []);
    const items = updateItems([{ ...itemA }, { ...itemB }]);
    const qualityDecreaseA = itemA.quality - items[0].quality;
    const qualityDecreaseB = itemB.quality - items[1].quality;
    console.log(qualityDecreaseB);
    expect(qualityDecreaseB).toBe(2 * qualityDecreaseA);
  });

  it('"Conjured" items degrade in Quality twice as fast as normal items', () => {
    const itemA = new Item("foo", 5, 10, []);
    const itemB = new Item("Conjured foo", 5, 10, ["Conjured"]);
    const items = updateItems([{ ...itemA }, { ...itemB }]);
    const qualityDecreaseA = itemA.quality - items[0].quality;
    const qualityDecreaseB = itemB.quality - items[1].quality;
    expect(qualityDecreaseB).toBe(2 * qualityDecreaseA);
  });

  it('expired "Conjured" items degrade in Quality 4x as fast as normal items', () => {
    const itemA = new Item("foo", 5, 10, []);
    const itemB = new Item("Conjured foo", -1, 10, ["Conjured"]);
    const items = updateItems([{ ...itemA }, { ...itemB }]);
    const qualityDecreaseA = itemA.quality - items[0].quality;
    const qualityDecreaseB = itemB.quality - items[1].quality;
    expect(qualityDecreaseB).toBe(4 * qualityDecreaseA);
  });

  it("The Quality of an item is never negative", () => {
    const items = updateItems([new Item("foo", 0, 0, [])]);
    expect(items[0].quality).toBeGreaterThanOrEqual(0);
  });

  it('"Aged Brie" actually increases in Quality the older it gets', () => {
    const items = updateItems([new Item("Aged Brie", 0, 1, ["Brie"])]);
    expect(items[0].quality).toBe(2);
  });
  // - The Quality of an item is never more than 50
  it('"Sulfuras", being a legendary item, never has to be sold or decreases in Quality', () => {
    const items = updateItems([
      new Item("Sulfuras, Hand of Ragnaros", 20, 80, ["Legendary"]),
    ]);
    expect(items[0].quality).toBe(80);
    expect(items[0].sellIn).toBe(20);
  });
  // - "Backstage passes", like aged brie, increases in Quality as its SellIn value approaches;
  // Quality increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but
  // Quality drops to 0 after the concert
});
