import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProfileActions } from "../../../../Redux store/ProfileActions";
import styles from "../../../../UI/CSS/Form.module.css";
import Card from "../../../../UI/Card/Card";
import { ModalActions } from "../../../../Redux store/ModalSlice";

const UserProfileForm = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);

  const [name, setName] = useState(profile.name ?? "");
  const [email] = useState(profile.email ?? "");
  const [phone, setPhone] = useState(profile.phone ?? "");

  const [addresses, setAddresses] = useState(
    profile.address?.length
      ? profile.address.map((a) => ({
          title: a.title ?? "",
          place: a.place ?? "",
        }))
      : [{ title: "", place: "" }]
  );

  const addAddress = () =>
    setAddresses([...addresses, { title: "", place: "" }]);

  const updateAddressField = (index, field, value) => {
    const updated = [...addresses];
    updated[index][field] = value;
    setAddresses(updated);
  };

  const removeAddress = (index) => {
    setAddresses(addresses.filter((_, i) => i !== index));
  };

  const clean = (val) =>
    val?.toString().trim().length > 0 ? val.trim() : null;

  const capitalizeLive = (str) => {
    if (!str) return "";

    const leadingSpaces = str.match(/^ */)[0];
    const trimmed = str.trimStart();

    if (!trimmed.length) return leadingSpaces;

    return leadingSpaces + trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const profileData = {
      name: clean(name),
      email: clean(email),
      phone: clean(phone),
      address: addresses.map((a) => ({
        title: clean(a.title),
        place: clean(a.place),
      })),
    };

    dispatch(ProfileActions.updateFullProfile(profileData));
    dispatch(ModalActions.unsetModal());
  };

  return (
    <div className={styles.authFormCenter}>
      <Card>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2 className={styles.title}>User Profile</h2>

          <div className={styles.inputWrapper}>
            <input
              type="text"
              className={`${styles.input} ${styles.upf_left}`}
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(capitalizeLive(e.target.value))}
            />
          </div>

          <div className={styles.inputWrapper}>
            <input
              type="email"
              className={`${styles.input} ${styles.upf_left}`}
              value={email}
              disabled
            />
          </div>

          <div className={styles.inputWrapper}>
            <input
              type="number"
              className={`${styles.input} ${styles.upf_left}`}
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div
            className={`${styles.inputWrapper} ${styles.upf_address_header_row}`}
          >
            <h4 className={styles.upf_address_label}>Addresses</h4>

            <button
              type="button"
              onClick={addAddress}
              className={styles.upf_add_btn}
            >
              +
            </button>
          </div>

          {addresses.map((addr, index) => (
            <div key={index} className={styles.upf_address_row}>
              <input
                type="text"
                className={`${styles.input} ${styles.upf_address_title_input}`}
                placeholder="Address Title (e.g., Home)"
                value={addr.title}
                onChange={(e) =>
                  updateAddressField(
                    index,
                    "title",
                    capitalizeLive(e.target.value)
                  )
                }
              />

              <textarea
                className={`${styles.textarea} ${styles.upf_address_input}`}
                placeholder={`Address ${index + 1}`}
                value={addr.place}
                onChange={(e) =>
                  updateAddressField(
                    index,
                    "place",
                    capitalizeLive(e.target.value)
                  )
                }
              />

              {index > 0 ? (
                <button
                  type="button"
                  className={styles.upf_remove_btn}
                  onClick={() => removeAddress(index)}
                >
                  –
                </button>
              ) : (
                <div className={styles.upf_placeholder_btn}></div>
              )}
            </div>
          ))}

          <div className={styles.upf_btn_row}>
            <button type="submit">Save Profile</button>
            <button
              type="button"
              onClick={() => dispatch(ModalActions.unsetModal())}
            >
              Cancel
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default UserProfileForm;
