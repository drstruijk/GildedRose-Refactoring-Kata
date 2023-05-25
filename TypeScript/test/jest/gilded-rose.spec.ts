import { Item, GildedRose } from "@/gilded-rose";

describe("Gilded Rose", () => {
  it("should foo", () => {
    const gildedRose = new GildedRose([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("foo");
  });

  it("Once the sell by date has passed, Quality degrades twice as fast", () => {
    const itemA = new Item("foo", 5, 10);
    const itemB = new Item("foo", 0, 10);
    const gildedRose = new GildedRose([itemA, itemB]);
    const items = gildedRose.updateQuality();
    const qualityDecreaseA = itemA.quality - items[0].quality;
    const qualityDecreaseB = itemB.quality - items[1].quality;
    expect(qualityDecreaseB).toBe(2 * qualityDecreaseA);
  });

  it("The Quality of an item is never negative", () => {
    const gildedRose = new GildedRose([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBeGreaterThanOrEqual(0);
  });

  it('"Aged Brie" actually increases in Quality the older it gets', () => {
    const gildedRose = new GildedRose([new Item("Aged Brie", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBeGreaterThanOrEqual(1);
  });
  // - The Quality of an item is never more than 50
  // - "Sulfuras", being a legendary item, never has to be sold or decreases in Quality
  // - "Backstage passes", like aged brie, increases in Quality as its SellIn value approaches;
  // Quality increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but
  // Quality drops to 0 after the concert
});
