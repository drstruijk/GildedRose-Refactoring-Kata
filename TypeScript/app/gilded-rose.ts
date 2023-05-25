type Attribute = "Conjured" | "Legendary" | "Brie" | "Backstage";
export class Item {
  name: string;
  sellIn: number;
  quality: number;
  attributes: Array<Attribute>;

  constructor(name, sellIn, quality, attributes) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
    this.attributes = attributes;
  }
}

function updateItem(item: Item) {
  if (item.name == "Sulfuras, Hand of Ragnaros") {
    return item;
  }

  let changeInQuality = 0;
  let changeInSellIn = -1;

  if (item.name == "Aged Brie") {
    changeInQuality += 1;
  } else if (item.name == "Backstage passes to a TAFKAL80ETC concert") {
    changeInQuality += 1;
    if (item.sellIn < 11) {
      changeInQuality += 1;
    }
    if (item.sellIn < 6) {
      changeInQuality += 1;
    }
  } else {
    if (item.quality > 0) {
      changeInQuality += -1;
    }
  }

  if (item.sellIn < 0) {
    if (item.name == "Aged Brie") {
      changeInQuality += 1;
    } else {
      if (item.name == "Backstage passes to a TAFKAL80ETC concert") {
        changeInQuality += -item.quality;
      } else {
        if (item.quality > 0) {
          changeInQuality += -1;
        }
      }
    }
  }

  if (item.name.startsWith("Conjured") && changeInQuality < 0) {
    changeInQuality *= 2;
  }

  item.quality += changeInQuality;
  item.sellIn += changeInSellIn;

  if (item.quality > 50) {
    item.quality = 50;
  }

  return item;
}

export function updateItems(items: Array<Item>) {
  return items.map(updateItem);
}
