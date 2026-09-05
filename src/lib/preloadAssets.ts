import idleBody from '../../asset/idle/body.PNG'
import idleHair from '../../asset/idle/hair.PNG'
import idleExcited from '../../asset/idle/excited.PNG'
import idleEyes from '../../asset/idle/eyes.PNG'
import idleBlink from '../../asset/idle/blink.PNG'
import idleLeftPupil from '../../asset/idle/left pupil.PNG'
import idleRightPupil from '../../asset/idle/right pupil.PNG'
import idleGlasses from '../../asset/idle/glasses.PNG'

import run1 from '../../asset/run/run1.PNG'
import run2 from '../../asset/run/run2.PNG'
import run3 from '../../asset/run/run3.PNG'

import sitLegs from '../../asset/sitting/legs.PNG'
import sitBody from '../../asset/sitting/body.PNG'
import sitFace from '../../asset/sitting/face.PNG'
import sitMouth from '../../asset/sitting/mouth.PNG'
import sitEyes from '../../asset/sitting/eyes.PNG'
import sitPupils from '../../asset/sitting/pupils.PNG'
import sitHair from '../../asset/sitting/hair.PNG'
import sitGlasses from '../../asset/sitting/IMG_0210.PNG'
import sitLaugh from '../../asset/sitting/laugh.PNG'

import sushiPlatter from '../../asset/sushi/sushi_platter.PNG'
import sushiPop from '../../asset/sushi/pop.PNG'

import sierraCollege from '../../asset/education/Sierra College.PNG'
import sjsu from '../../asset/education/SJSU.PNG'
import transferIcon from '../../asset/education/transfer_icon.PNG'

/** Intro and portfolio image URLs to preload. */
export const CHARACTER_ASSET_URLS = [
  idleBody,
  idleHair,
  idleExcited,
  idleEyes,
  idleBlink,
  idleLeftPupil,
  idleRightPupil,
  idleGlasses,
  run1,
  run2,
  run3,
  sitLegs,
  sitBody,
  sitFace,
  sitMouth,
  sitEyes,
  sitPupils,
  sitHair,
  sitGlasses,
  sitLaugh,
  sushiPlatter,
  sushiPop,
  sierraCollege,
  sjsu,
  transferIcon,
] as const

function preloadOne(src: string) {
  return new Promise<void>((resolve) => {
    const img = new Image()
    img.decoding = 'async'
    img.onload = () => {
      if (typeof img.decode === 'function') {
        img.decode().then(() => resolve()).catch(() => resolve())
        return
      }
      resolve()
    }
    img.onerror = () => resolve()
    img.src = src
  })
}

/** Loads and decodes character asset images. */
export function preloadCharacterAssets() {
  return Promise.all(CHARACTER_ASSET_URLS.map(preloadOne))
}
