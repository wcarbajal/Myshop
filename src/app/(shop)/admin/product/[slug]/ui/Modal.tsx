
import { useState } from 'react';
import styles from './Modal.module.css';

import Html5QrcodePlugin from './Html5QrcodePlugin.jsx';
import ResultContainerPlugin from './ResultContainerPlugin.jsx';

// To use Html5QrcodeScanner (more info below)
import { Html5QrcodeScanner } from "html5-qrcode";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;  // any component or HTML fragment  // any React Node
}



export const Modal = ( { isOpen, onClose, children }: Props ) => {


  const [ decodedResults, setDecodedResults ] = useState<string[]>( [] );
  if ( !isOpen ) return null;

  const onNewScanResult = ( decodedText: string, decodedResult: string ) => {
    console.log( "App [result]", decodedResult );

    setDecodedResults( ( prev: string[] ) => [ ...prev, decodedResult ] );
  };

  return (
    <div id='reader' className={ styles[ 'modal-overlay' ] } onClick={ onClose }>
      <div className={ styles[ 'modal-content' ] } onClick={ ( e ) => e.stopPropagation() }>
        <Html5QrcodePlugin
          fps={ 10 }
          qrbox={ 250 }
          disableFlip={ false }
          qrCodeSuccessCallback={ onNewScanResult }
        />
        <ResultContainerPlugin results={ decodedResults } />


        <button className={ styles[ 'modal-close' ] } onClick={ onClose }>
          &times;
        </button>
        { children }
      </div>
    </div>
  );
};


