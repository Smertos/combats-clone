import { Item } from './interfaces/item'
import { ItemType } from './enums/item-type'
import { Player } from './player'
import { Inventory } from './inventory'
import { SHA256 } from 'crypto-js'
import nanoid from 'nanoid'

const { itemSellRate, items } = require('../../gamedata.json')

export class Shop {
  
  buy (player: Player, item: Item): boolean {
    let inventory = player.getInventory()

    if (inventory.removeGold(item.price)) {
      inventory.addItem(Object.assign({ 
        uid: nanoid(),
        color: SHA256(item.name).toString().slice(0, 6)
      }, item))

      return true
    }
    
    return false
  }

  getSellPrice (item: Item): number {
    return Math.round(item.price * itemSellRate)
  }

  sellItem (inventory: Inventory, item: Item) {
    let price = this.getSellPrice(item)

    inventory.removeItem(item.uid)
    inventory.addGold(price)
  }

  getItems (): Item[] {
    return items
  }

}
