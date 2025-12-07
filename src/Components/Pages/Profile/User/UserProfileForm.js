import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProfileActions } from "../../../../Redux store/ProfileActions";
import styles from "../../../../UI/CSS/Form.module.css";
import Card from "../../../../UI/Card/Card";
import { ModalActions } from "../../../../Redux store/ModalSlice";

const UserProfileForm = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);

  const capitalizeFirst = (str) => {
    if (!str) return "";
    const trimmed = str.trim();
    if (trimmed.length === 0) return "";
    return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
  };

  const [name, setName] = useState(profile.name ?? "");
  const [email] = useState(profile.email ?? "");
  const [phone, setPhone] = useState(profile.phone ?? "");
  const [addresses, setAddresses] = useState(profile.address ?? [""]);

  const addAddress = () => setAddresses([...addresses, ""]);

  const updateAddress = (value, index) => {
    const updated = [...addresses];
    updated[index] = capitalizeFirst(value);
    setAddresses(updated);
  };

  const removeAddress = (index) => {
    setAddresses(addresses.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const clean = (val) =>
      val?.toString().trim().length > 0 ? val.trim() : null;

    const profileData = {
      name: clean(name),
      email: clean(email),
      phone: clean(phone),
      address: addresses.map((a) => clean(a)),
    };

    console.log("SAVING PROFILE:", profileData);

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
              onChange={(e) => setName(capitalizeFirst(e.target.value))}
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
              <textarea
                className={`${styles.textarea} ${styles.upf_address_input}`}
                placeholder={`Address ${index + 1}`}
                value={addr}
                onChange={(e) => updateAddress(e.target.value, index)}
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

          <button type="submit">Save Profile</button>
        </form>
      </Card>
    </div>
  );
};

export default UserProfileForm;
