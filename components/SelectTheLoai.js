import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { getTheLoai } from '../api/truyenApi';

const SelectTheLoaiDropdown = ({ onChange }) => {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(null);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTheLoai = async () => {
            try {
                const data = await getTheLoai();
                console.log(data.length)
                const dropdownItems = data.map((theLoai) => ({
                    label: `${theLoai.name}`,
                    value: theLoai.term_id,
                }));

                setItems(dropdownItems);

                // set mặc định là item đầu tiên nếu có
                if (dropdownItems.length > 0) {
                    setSelected(dropdownItems[0].value);
                    if (onChange) onChange(dropdownItems[0]);
                }
            } catch (err) {
                setError(err.message || 'Lỗi khi lấy thể loại');
            } finally {
                setLoading(false);
            }
        };

        fetchTheLoai();
    }, []);

    if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
    if (error) return <Text>Lỗi: {error}</Text>;

    return (
        <View style={styles.container}>
            <View style={{ width: 150, flex: 1}}>
            <DropDownPicker
                open={open}
                value={selected}
                items={items}
                setOpen={setOpen}
                setValue={setSelected}
                setItems={setItems}
                placeholder="-- Chọn thể loại --"
                searchable={false}
                onChangeValue={(value) => {
                    const selectedItem = items.find(item => item.value === value);
                    console.log(selectedItem)
                    onChange && onChange({
                        value,
                        label: selectedItem?.label,
                    });
                }}
                style={styles.dropdown}
                listMode="MODAL"
                zIndex={1000}
                modalTitle="Chọn Danh Mục"
                modalTitleStyle={{
                    width: '100%',         // QUAN TRỌNG để center đúng
                    paddingLeft: 15,
                    fontWeight: 'bold'
                }}
                modalContentContainerStyle={{
                    backgroundColor: '#efefef',
                    paddingTop: 20,
                    paddingBottom: 20
                }}
                closeIconStyle={{
                    tintColor: '#1e40af', // màu dấu X
                }}
                listItemContainerStyle={{
                    backgroundColor: '#fff',
                    paddingHorizontal: 20
                }}
                modalTitleContainerStyle={{
                    flexDirection: 'row-reverse',

                }}
            />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        zIndex: 1000,
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        paddingHorizontal: 15,
        flex: 1
    },
    dropdown: {
        // borderWidth: 0,
        borderColor: '#ccc',
        marginBottom: 10,
        paddingHorizontal: 10,
        overflow: 'hidden',
    }
});

export default SelectTheLoaiDropdown;
