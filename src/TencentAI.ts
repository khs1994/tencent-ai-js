import AbstractTencentAI from './AbstractTencentAI';
import NLP from './NLP';
import Face from './Face';
import Image from './Image';
import ImageSpecialEffects from './ImageSpecialEffects';
import OCR from './OCR';
import Person from './Person';
import Speech from './Speech';
import Translate from './Translate';
import TencentAIError from './Error/TencentAIError';

class TencentAI extends AbstractTencentAI {
  get nlp(): NLP {
    return new NLP(this.appKey, this.appId);
  }

  get face(): Face {
    return new Face(this.appKey, this.appId);
  }

  get image(): Image {
    return new Image(this.appKey, this.appId);
  }

  get imageSpecialEffects(): ImageSpecialEffects {
    return new ImageSpecialEffects(this.appKey, this.appId);
  }

  get ocr(): OCR {
    return new OCR(this.appKey, this.appId);
  }

  get person(): Person {
    return new Person(this.appKey, this.appId);
  }

  get speech(): Speech {
    return new Speech(this.appKey, this.appId);
  }

  get translate(): Translate {
    return new Translate(this.appKey, this.appId);
  }
}

export default TencentAI;

export {
  NLP,
  Face,
  Image,
  ImageSpecialEffects,
  OCR,
  Person,
  Speech,
  Translate,
  TencentAIError,
  TencentAI,
};
