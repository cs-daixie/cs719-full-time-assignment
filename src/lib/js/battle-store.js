import { writable } from "svelte/store";
import { pokedex } from "./pokedex.js";

export const battleStore = writable(getTwoRandomPokemon());

/**
 * Performs an attack, from the given attacking pokemon to the given defending pokemon.
 *
 * @param {*} attacker The attacking pokemon
 * @param {*} defender The defending pokemon
 */
export function attack(attacker, defender) {
  if (!attacker.canAttack) return; // If the attacker can't actually attack, don't do anything.

  // TODO Your code here.
  // -----------------------------------------------------
  // -----------------------------------------------------

  // Keep this line at the end of the function to cause the actual
  // Svelte store to update itself properly.
  updateBattleStore(attacker, defender);
}

// Can be uncommented for debug purposes. Will log to the console everytime the store is updated.
// battleStore.subscribe(console.log);

/**
 * Gets two random pokemon. These pokemon will be copies of two different pokemon from the pokedex array, with two
 * additional properties:
 *
 * hp: The pokemon's current hp (as opposed to its maxHtp)
 * canAttack: True if the pokemon can currently attack, false otherwise.
 *
 * @returns an array of _copies_ of two random pokemon from the pokedex array.
 */
function getTwoRandomPokemon() {
  let index1 = 0;
  let index2 = 0;

  // Ensure that the two chosen pokemon are not the same.
  while (index1 === index2) {
    index1 = Math.floor(Math.random() * pokedex.length);
    index2 = Math.floor(Math.random() * pokedex.length);
  }

  return [
    { ...pokedex[index1], hp: pokedex[index1].maxHp, canAttack: true },
    { ...pokedex[index2], hp: pokedex[index2].maxHp, canAttack: false }
  ];
}

/**
 * Utility function that will cause the store to update as follows. The store will be
 * set to a copy of the existing battlers array, except:
 * - If the pokemon at that array index is the attacker, it will be set to a copy of the attacker
 * - If the pokemon at that array index is the defender, it will be set to a copy of the defender
 * - Otherwise, it will be kept as-is.
 *
 * @param {*} attacker the attacking pokemon
 * @param {*} defender the defending pokemon
 */
function updateBattleStore(attacker, defender) {
  battleStore.update((battlers) =>
    battlers.map((p) => {
      if (p.dexNumber === attacker.dexNumber) return { ...attacker };
      else if (p.dexNumber === defender.dexNumber) return { ...defender };
      else return p;
    })
  );
}
