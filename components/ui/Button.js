import Link from "next/link";
import classes from "../../styles/button.module.css";

export default function Button(props) {
  return (
    <Link href={props.link} className={classes.btn}>
      {props.children}
    </Link>
  );
}
