import { selectedProjectAtom } from "../../store/store";
import { useAtomValue } from "jotai";

const ContentBox = () => {
  const selectedProject = useAtomValue(selectedProjectAtom);

  const iframe = () => {
    switch (selectedProject) {
      case "1":
        return (
          <iframe
            src="/projects/ojt1/dist/index.html"
            width="100%"
            height="100%"
          />
        );
      case "2":
        return (
          <iframe
            src="/projects/ojt2/dist/index.html"
            width="100%"
            height="100%"
          />
        );

      case "3":
        return (
          <iframe
            src="/projects/ojt3/dist/index.html"
            width="100%"
            height="100%"
          />
        );
      case "4":
        return (
          <iframe
            src="/projects/ojt4/dist/index.html"
            width="100%"
            height="100%"
          />
        );

      case "4-ex":
        return (
          <iframe
            src="/projects/ojt4-ex/dist/index.html"
            width="100%"
            height="100%"
          />
        );
    }
  };

  return <>{iframe()}</>;
};
export default ContentBox;
