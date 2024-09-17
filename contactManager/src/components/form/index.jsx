import { useState } from "react";
import styles from "./form.module.css";
import { STORAGE_SERVICE } from "../../services/storage";

export function ContactForm() {
  const [nameValue, setNameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [phoneValue, setPhoneValue] = useState("");
  const [contacts, setContacts] = useState(
    () => STORAGE_SERVICE.listContacts() || []
  );
  const [visible, setVisible] = useState(false);

  function handleClick(e) {
    e.preventDefault();

    if (!nameValue) {
      return alert("O nome é obrigatório!");
    }
    if (!emailValue) {
      return alert("O e-mail é obrigatório!");
    }
    if (!phoneValue) {
      return alert("O telefone é obrigatório!");
    }

    const newContact = {
      name: nameValue,
      email: emailValue,
      phone: phoneValue,
    };

    STORAGE_SERVICE.createContact(newContact);
    const updatedContacts = STORAGE_SERVICE.listContacts();
    setContacts(updatedContacts);

    setNameValue("");
    setEmailValue("");
    setPhoneValue("");
  }

  function handleDelete(contactName) {
    STORAGE_SERVICE.deleteContact(contactName);
    setContacts(STORAGE_SERVICE.listContacts());
  }
  
  return (
    <>
      <form>
        <div className={styles.form}>
          <div className={styles.text}>
            <h2>Cadastro</h2>
            <p>Cadastre agora o contato de seus amigos e familiares!</p>
          </div>
          <input
            type="text"
            placeholder="Nome"
            onChange={(e) => setNameValue(e.target.value)}
            value={nameValue}
          />
          <input
            type="email"
            placeholder="E-mail"
            onChange={(e) => setEmailValue(e.target.value)}
            value={emailValue}
          />
          <input
            type="number"
            placeholder="Telefone"
            onChange={(e) => setPhoneValue(e.target.value)}
            value={phoneValue}
          />
          <button type="submit" onClick={handleClick}>
            Cadastrar
          </button>
        </div>
      </form>
      <div className={styles.listContacts}>
        <button
          className={styles.listbutton}
          onClick={() => setVisible(!visible)}
        >
          Ver Contatos
        </button>
        <div className={styles.elementDivider}></div>
        {visible && (
          <>
            <h1>Lista de Contatos:</h1>
            {contacts.length === 0 && <p>Nenhum Contato Cadastrado</p>}
            <ul className={styles.contactList}>
              {contacts.map((contact, index) => (
                <li key={index}>
                  <div className={styles.contactInfo}>
                    <strong>Nome:</strong> {contact.name} <br />
                    <strong>E-mail:</strong> {contact.email} <br />
                    <strong>Telefone:</strong> {contact.phone}
                  </div>

                  <div>
                    <button className={styles.deleteButton} onClick={() => handleDelete(contact.name)}>
                      Deletar
                    </button>
                    <button className={styles.editButton }>Editar</button>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  );
}
