import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addRow, updateRow, deleteRow, Row } from "./redux/tableSlice";

import EditModal from "./components/EditModal";
import { RootState } from "./redux/store";
import Form from "./components/Form";
import Table from "./components/Table";
import styles from "./App.module.scss";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.table.data);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<Row | null>(null);

  const handleFormSubmit = (formData: Omit<Row, "id">) => {
    dispatch(
      addRow({
        ...formData,
        id: String(data.length + 1),
      })
    );
  };
  const handleEditformSubmit = (formData: Omit<Row, "id">) => {
    if (selectedRow) {
      dispatch(
        updateRow({
          id: selectedRow.id,
          data: {
            ...selectedRow,
            ...formData,
          },
        })
      );
    }
    setSelectedRow(null);
    setIsEditModalOpen(false);
  };
  const handleEdit = (id: string) => {
    const rowToEdit = data.find((row) => row.id === id);
    if (rowToEdit) {
      setSelectedRow(rowToEdit);
      setIsEditModalOpen(true);
    }
  };

  const handleDelete = (id: string) => {
    dispatch(deleteRow(id));
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Finzome Technologies Pvt Ltd Assignment By Samkit Kothari</h1>
      </header>
      <main className={styles.mainContainer}>
        <section className={styles.formSection}>
          <h2>Add New Row</h2>
          <Form onSubmit={handleFormSubmit} />
        </section>
        <section className={styles.tableSection}>
          <h2>Details Table</h2>
          <Table data={data} onEdit={handleEdit} onDelete={handleDelete} />
        </section>
        <EditModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          initialValues={selectedRow}
          id={selectedRow?.id || ""}
          onSubmit={handleEditformSubmit}
        />
      </main>
    </div>
  );
};
export default App;
