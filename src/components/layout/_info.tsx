import {
  faEnvelope,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./_info.module.css";
import { ReactElement } from "react";
import Image from "next/image";

export default function Info({
  isPublic,
  isAnonymous,
  anonymousName,
  name,
  title,
  city,
  email,
  linkedIn,
  github,
  phoneInt,
  phone,
  address1,
  address2,
  pictureUrl,
  children,
}: {
  isPublic: boolean;
  isAnonymous: boolean;
  anonymousName: string;
  name: string;
  title: string;
  city?: string;
  email?: string;
  linkedIn?: string;
  github?: string;
  phoneInt?: string;
  phone?: string;
  address1?: string;
  address2?: string;
  pictureUrl?: string;
  children?: ReactElement | ReactElement[];
}) {
  let elements = [];
  if (!isPublic && !isAnonymous) {
    if (email) {
      elements.push(
        <li key="email">
          <FontAwesomeIcon className={styles.icon} icon={faEnvelope} />{" "}
          <a href={"mailto:" + email}>{email}</a>
        </li>,
      );
    }
    if (phone && phoneInt) {
      elements.push(
        <li key="phone">
          <FontAwesomeIcon className={styles.icon} icon={faPhone} />{" "}
          <a href={"tel:" + phoneInt}>{phone}</a>
        </li>,
      );
    }
  }
  if (!isAnonymous) {
    if (linkedIn) {
      elements.push(
        <li key="linkedin">
          <FontAwesomeIcon className={styles.icon} icon={faLinkedin} />{" "}
          <a href={"https://" + linkedIn}>{linkedIn}</a>
        </li>,
      );
    }

    if (github) {
      elements.push(
        <li key="github">
          <FontAwesomeIcon className={styles.icon} icon={faGithub} />{" "}
          <a href={"https://" + github}>{github}</a>
        </li>,
      );
    }
  }
  if (address1) {
    elements.push(
      <li key="address">
        <FontAwesomeIcon className={styles.icon} icon={faLocationDot} />
        <span>
          {address1}
          {address2 && (
            <>
              <br /> {address2}
            </>
          )}
        </span>
      </li>,
    );
  } else {
    elements.push(
      <li key="address">
        <FontAwesomeIcon className={styles.icon} icon={faLocationDot} />
        <span> {city} </span>
      </li>,
    );
  }

  return (
    <section
      className={`${styles.info} ${pictureUrl ? styles["has-picture"] : ""}`}
    >
      <div>
        <h1 className={styles.title}>{isAnonymous ? anonymousName : name}</h1>
        <p className={styles.subtitle}>{title}</p>
      </div>
      <ul>{elements}</ul>
      {pictureUrl ? (
        <div className={styles.picture}>
          <div>
            <Image alt="profile picture" src={pictureUrl} fill />
          </div>
        </div>
      ) : (
        <></>
      )}
      <section className={styles.intro}>{children}</section>
    </section>
  );
}
