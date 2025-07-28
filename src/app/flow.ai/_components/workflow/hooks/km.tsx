/**
 * 键鼠操作的hooks
 */
import {useEventListener} from 'ahooks';

export const useContextMenu = (action: (e: MouseEvent) => void) => {
  useEventListener('contextmenu', (e) => {
    e.preventDefault();
    action(e);
  });
}

export const useMousemove = (action: (e: MouseEvent) => void) => {
  useEventListener('mousemove', (e) => {
    action(e);
  });
}