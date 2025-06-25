import { useMemo } from "react";
import TextField from "../ui/TextField";
import SelectField from "../ui/SelectField";
import Checkbox from "../ui/Checkbox";
import GenderSelection from "../ui/GenderSelection";
import jamatkhanaByCouncil from "../../data/Jamatkhana.json";

const REGION_OPTIONS = [
  { value: "", label: "Select a region" },
  { value: "southern", label: "Southern Region" },
  { value: "central", label: "Central Region" },
  { value: "gilgit", label: "Gilgit Region" },
  { value: "hunza", label: "Hunza Region" },
  { value: "ishkoman_punial", label: "Ishkoman Punial Region" },
  { value: "gupis_yasin", label: "Gupis Yasin Region" },
  { value: "lower_chitral", label: "Lower Chitral Region" },
  { value: "upper_chitral", label: "Upper Chitral Region" },
];

const COUNCILS_BY_REGION = {
  southern: [
    "Garden",
    "Gulshan",
    "Kharadar",
    "Hyderabad",
    "Karimabad",
    "Tando Turel",
    "Thatta & Shah Bunder",
  ],
  central: [
    "Hafizabad",
    "Lahore",
    "Multan & Bahawalpur",
    "Peshawar",
    "Rawalpindi",
    "Sargodha",
  ],
  gilgit: ["Gilgit", "Skardu", "Sul, Dan & Oshikhandas"],
  hunza: [
    "Altit & Karimabad",
    "Alyabad & Hyderabad",
    "Chuperson",
    "Gulmit",
    "Gujal Bala",
    "Nasirabad",
    "Shimshal",
  ],
  ishkoman_punial: [
    "Chatoorkhand",
    "Damas",
    "Gahkuch",
    "Immit",
    "Ishkoman",
    "Sherquilla",
    "Singal",
  ],
  gupis_yasin: [
    "Gholaghmuli",
    "Gupis",
    "Phunder",
    "Pingal",
    "Silgan",
    "Sultanabad",
    "Thoi",
    "Yasin",
  ],
  lower_chitral: [
    "Arkari",
    "Chitral Town",
    "Garamchashma",
    "Madaklasht",
    "Parabeg",
    "Shoghore",
    "Susum",
  ],
  upper_chitral: [
    "Bang",
    "Booni",
    "Brep",
    "Khot",
    "Laspur",
    "Mastuj",
    "Mulkhow",
    "Rech",
    "Washich",
    "Yarkhoon Lasht",
  ],
};

const afghanDocOptions = [
  { value: "por", label: "POR Card" },
  { value: "passport_afr", label: "Afghan Passport" },
  { value: "tazkira", label: "Tazkira" },
];

const placeholderMap = {
  cnic: "Enter valid CNIC number",
  passport_afr: "AB1234567",
  por: "Enter valid POR number",
  tazkira: "Enter valid Tazkira number",
};

const PersonalDetailsSection = ({ data, errors, onChange }) => {
  const handleChange = (field, value) => onChange({ ...data, [field]: value });

  const handleRegionChange = (value) => {
    onChange({
      ...data,
      currentRegion: value,
      localCouncil: "",
      jamatkhana: "",
    });
  };

  const handleLocalCouncilChange = (value) => {
    onChange({
      ...data,
      localCouncil: value,
      jamatkhana: "",
    });
  };

  const localCouncilOptions = useMemo(() => {
    const list = COUNCILS_BY_REGION[data.currentRegion] || [];
    const options = list.map((name) => ({
      value: name.toLowerCase().replace(/\s+/g, "_"),
      label: name,
    }));
    return [{ value: "", label: "Select a local council" }, ...options];
  }, [data.currentRegion]);

  const jamatkhanaOptions = useMemo(() => {
    const list = jamatkhanaByCouncil[data.localCouncil] || [];
    const options = list.map((name) => ({
      value: name
        .toLowerCase()
        .replace(/[^a-z0-9]+/gi, "_")
        .replace(/^|$/g, ""),
      label: name,
    }));
    return [{ value: "", label: "Select a jamatkhana" }, ...options];
  }, [data.localCouncil]);

  return (
    <div className="space-y-6">
      <h2 className="hidden sm:block text-xl font-semibold">
        Personal Details
      </h2>

      {/* First / Last */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TextField
          label="First Name"
          value={data.firstName}
          onChange={(e) => handleChange("firstName", e.target.value)}
          error={errors?.firstName}
          required
        />
        <TextField
          label="Last Name"
          value={data.lastName}
          onChange={(e) => handleChange("lastName", e.target.value)}
          error={errors?.lastName}
          required
        />
      </div>

      {/* Date Of Birth / Gender */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TextField
          label="Date of Birth"
          type="date"
          value={data.birthDate}
          onChange={(e) => handleChange("birthDate", e.target.value)}
          error={errors?.birthDate}
          required
        />
        <GenderSelection
          value={data.gender}
          onChange={(val) => handleChange("gender", val)}
          error={errors?.gender}
        />
      </div>

      {/* Contact Number / WhatsApp */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TextField
          label="Contact Number"
          value={data.contactNumber}
          onChange={(e) => handleChange("contactNumber", e.target.value)}
          placeholder="Enter your calling number"
          error={errors?.contactNumber}
          required
        />
        <TextField
          label="WhatsApp Number"
          value={data.whatsapp}
          onChange={(e) => handleChange("whatsapp", e.target.value)}
          placeholder="Enter your WhatsApp number"
          error={errors?.whatsapp}
          required
        />
      </div>

      {/* Afghan migrant checkbox */}
      <Checkbox
        id="isAfghan"
        label="I am an Afghan migrant"
        checked={data.isAfghan}
        onChange={(e) => {
          const isNowAfghan = e.target.checked;
          onChange({
            ...data,
            isAfghan: isNowAfghan,
            documentType: isNowAfghan ? "por" : "cnic",
            documentNumber: "",
          });
        }}
      />

      {/* Document fields */}
      {data.isAfghan ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SelectField
            label="Document Type"
            value={data.documentType}
            onChange={(e) => handleChange("documentType", e.target.value)}
            options={afghanDocOptions}
            error={errors?.documentType}
            required
          />
          <TextField
            label={`${
              afghanDocOptions.find((o) => o.value === data.documentType)?.label
            } Number`}
            value={data.documentNumber}
            onChange={(e) => handleChange("documentNumber", e.target.value)}
            placeholder={placeholderMap[data.documentType] || ""}
            error={errors?.documentNumber}
            required
          />
        </div>
      ) : (
        <TextField
          label="CNIC (picture would be asked upon selection)"
          value={data.documentNumber}
          onChange={(e) => handleChange("documentNumber", e.target.value)}
          placeholder={placeholderMap.cnic}
          error={errors?.documentNumber}
          required
        />
      )}

      {/* Email / Address */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TextField
          label="Email"
          type="email"
          value={data.email}
          onChange={(e) => handleChange("email", e.target.value)}
          error={errors?.email}
          required
        />
        <TextField
          label="Current Address"
          value={data.address}
          onChange={(e) => handleChange("address", e.target.value)}
          error={errors?.address}
          required
        />
      </div>

      {/* Permanent / Current Region */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SelectField
          label="Permanent Regional Council"
          value={data.permanentRegion}
          onChange={(e) => handleChange("permanentRegion", e.target.value)}
          options={REGION_OPTIONS}
          error={errors?.permanentRegion}
          required
        />
        <SelectField
          label="Current Regional Council"
          value={data.currentRegion}
          onChange={(e) => handleRegionChange(e.target.value)}
          options={REGION_OPTIONS}
          error={errors?.currentRegion}
          required
        />
      </div>

      {/* Local Council & Jamatkhana */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SelectField
          label="Current Local Council"
          value={data.localCouncil}
          onChange={(e) => handleLocalCouncilChange(e.target.value)}
          options={localCouncilOptions}
          error={errors?.localCouncil}
          required
        />
        <SelectField
          label="Jamatkhana"
          value={data.jamatkhana}
          onChange={(e) => handleChange("jamatkhana", e.target.value)}
          options={jamatkhanaOptions}
          error={errors?.jamatkhana}
          required
        />
      </div>
    </div>
  );
};

export default PersonalDetailsSection;
