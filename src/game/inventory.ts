import { ItemType } from './enums/item-type'
import { Item } from './interfaces/item'
import { Equipped } from './interfaces/equipped'

const inventorySizeLimit = 50
const goldLimit = 50000

export class Inventory {

  equipped: Equipped = {}

  constructor (private items: Item[] = [], private gold: number = 100) {}

  getItems (): Item[] {
    return this.items    
  }

  addItem (item: Item): boolean {
    if (inventorySizeLimit <= 0 || this.items.length < inventorySizeLimit) {
      this.items.push(item)

      return true
    }

    return false
  }

  addGold (amount: number): void {
    if (goldLimit <= 0) {
      this.gold += amount
    } else {
      this.gold = Math.min(this.gold + amount, goldLimit)
    }
  }

  removeGold (amount: number): boolean {
    if (this.gold >= amount) {
      this.gold = Math.max(this.gold - amount, 0)

      return true
    }
    
    return false
  }

  getGold (): number {
    return this.gold
  }

  removeItem (uid: string): Item {
    let result: Item[] = this.items.filter(e => e.uid === uid)

    this.items = this.items.filter(e => e.uid !== uid)

    return result[0]
  }

  wearItem (item: Item, left: boolean = false): void {
    let oldItem: Item = this.equipped[item.getInfo()['type']]

    if (oldItem) {
      this.addItem(oldItem)
    }

    if (Object.values(ItemType).indexOf(item.getInfo()['type']) !== -1) {
      if (item.getInfo()['type'] === ItemType.Ring) {
        this.equipped[left ? 'leftRing' : 'rightRing'] = item
      } else {
        this.equipped[item.getInfo()['type']] = item 
      }

      this.removeItem(item.uid)
    }
  }

}
