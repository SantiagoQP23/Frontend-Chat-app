import {animateScroll, scroller} from 'react-scroll';



export const scrollToBottom = ( id: string ) => {
    
  animateScroll.scrollToBottom({
      containerId: id,
      duration: 0
  });

}

export const scrollToBottomAnimated = ( id: string ) => {
  scroller.scrollTo( '631e747bf61ec3868a2845f3', {
      containerId: 'contenedorMensajes',
      duration: 250, 
      

  });

}