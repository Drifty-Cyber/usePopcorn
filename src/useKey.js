import { useEffect } from "react";

export function useKey(key, action) {
  useEffect(
    function () {
      const listenerFunction = (e) => {
        if (e.code.toLowerCase() === key.toLowerCase()) {
          action();
          //   onCloseMovie();
          // console.log("close");
        }
      };

      document.addEventListener("keydown", listenerFunction);

      return function () {
        document.removeEventListener("keydown", listenerFunction);
      };
    },
    // [onCloseMovie]
    [action, key]
  );
}
