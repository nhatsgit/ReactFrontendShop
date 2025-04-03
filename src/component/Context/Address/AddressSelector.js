import React, { useState, useEffect } from "react";
import { GetDistricts, GetProvinces, GetWards } from "../../../apiServices/AddressService";
import { notification } from "antd";

const AddressSelector = ({ onClose, setAddress }) => {
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedWard, setSelectedWard] = useState("");
    const [specificAddress, setSpecificAddress] = useState("");

    useEffect(() => {
        async function fetchProvinces() {
            const data = await GetProvinces();
            setProvinces(data);
        }
        fetchProvinces();
    }, []);

    useEffect(() => {
        if (selectedProvince) {
            async function fetchDistricts() {
                const data = await GetDistricts(selectedProvince);
                setDistricts(data);
                setWards([]);
                setSelectedDistrict("");
                setSelectedWard("");
            }
            fetchDistricts();
        }
    }, [selectedProvince]);

    useEffect(() => {
        if (selectedDistrict) {
            async function fetchWards() {
                const data = await GetWards(selectedDistrict);
                setWards(data);
                setSelectedWard("");
            }
            fetchWards();
        }
    }, [selectedDistrict]);

    const handleProvinceChange = (e) => setSelectedProvince(e.target.value);
    const handleDistrictChange = (e) => setSelectedDistrict(e.target.value);
    const handleWardChange = (e) => setSelectedWard(e.target.value);
    const handleAddressChange = (e) => setSpecificAddress(e.target.value);

    const handleSubmit = () => {
        if (!selectedProvince || !selectedDistrict || !selectedWard || !specificAddress.trim()) {
            notification.warning({
                message: "Lỗi nhập",
                description: "Vui lòng chọn và nhập đầy đủ địa chỉ trước khi lưu!"
            })
            return;
        }

        const fullAddress = {
            province: provinces.find((p) => p.code === selectedProvince)?.name_with_type || "",
            district: districts.find((d) => d.code === selectedDistrict)?.name_with_type || "",
            ward: wards.find((w) => w.code === selectedWard)?.name_with_type || "",
            specificAddress,
        };
        const addressString = [
            fullAddress.specificAddress,
            fullAddress.ward,
            fullAddress.district,
            fullAddress.province,
        ]
            .filter(Boolean)
            .join(", ");

        setAddress(addressString);
        onClose();
    };

    return (
        <div id="popup" className="form-group">
            <div style={{ display: "inline-block" }}>
                <select id="province" name="province" value={selectedProvince} onChange={handleProvinceChange}>
                    <option value="">Chọn tỉnh/thành phố</option>
                    {provinces.map((province) => (
                        <option key={province.code} value={province.code}>
                            {province.name_with_type}
                        </option>
                    ))}
                </select>
            </div>
            <div style={{ display: "inline-block" }}>
                <select id="district" name="district" value={selectedDistrict} onChange={handleDistrictChange}>
                    <option value="">Chọn quận/huyện</option>
                    {districts.map((district) => (
                        <option key={district.code} value={district.code}>
                            {district.name_with_type}
                        </option>
                    ))}
                </select>
            </div>
            <div style={{ display: "inline-block" }}>
                <select id="ward" name="ward" value={selectedWard} onChange={handleWardChange}>
                    <option value="">Chọn xã/phường</option>
                    {wards.map((ward) => (
                        <option key={ward.code} value={ward.code}>
                            {ward.name_with_type}
                        </option>
                    ))}
                </select>
            </div>
            <input
                id="specificAddress"
                name="specificAddress"
                placeholder="Địa chỉ cụ thể"
                value={specificAddress}
                onChange={handleAddressChange}
            />

            <button type="button" onClick={handleSubmit}>
                Lưu Địa Chỉ
            </button>
            <button type="button" id="btnclose" onClick={onClose}>
                Hủy
            </button>
        </div>
    );
};

export default AddressSelector;