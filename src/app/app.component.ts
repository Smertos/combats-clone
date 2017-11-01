import { Component } from '@angular/core'
import { GameService } from '../injectables/game.service'
import { Player } from '../game/player'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  links = [
    { name: 'Fight',     url: '/fight'    },
    { name: 'Inventory', url: '/backpack' },
    { name: 'Shop',      url: '/shop'     }
  ]

  gold = 5

  player: Player

  constructor (private game: GameService) {}

  onUsernameSelect(username: string) {
    this.player = this.game.getPlayer(username)
  }
}
