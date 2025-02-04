import React, { useState } from "react";

import { Button, Card, ListGroup, Modal } from "flowbite-react";

import { BiShow } from "react-icons/bi";
import { HiUser } from "react-icons/hi";
import { VscEdit } from "react-icons/vsc";

import useUsers from "../../api/project/useUsers";

const PermissionModal: React.FC<{
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  person: string;
  role: string;
  setRole: React.Dispatch<React.SetStateAction<string>>;
}> = (props) => {
  return (
    <Modal
      show={props.show}
      size="md"
      dismissible={true}
      onClose={() => {
        props.setShow(false);
      }}
    >
      <Modal.Body>
        <h3 className="text-xl font-medium text-gray-900 dark:text-white">
          {props.person}
        </h3>
        <div className="py-3"></div>

        <div className="flex justify-center space-y-6">
          <div className="w-10/12">
            <ListGroup>
              <ListGroup.Item
                active={props.role === "edit"}
                onClick={() => {
                  props.setRole("edit");
                  console.log("edit");
                }}
              >
                <div className="flex w-full justify-between">
                  <p>Edit</p>
                  <VscEdit className="h-5 w-5" />
                </div>
              </ListGroup.Item>
              <ListGroup.Item
                active={props.role === "view"}
                onClick={() => {
                  props.setRole("view");
                  console.log("view");
                }}
              >
                <div className="flex w-full justify-between">
                  <p>View</p>
                  <BiShow className="h-5 w-5" />
                </div>
              </ListGroup.Item>
            </ListGroup>
          </div>
        </div>
        <div className="flex justify-center py-3">
          <Button
            color="gray"
            onClick={(e) => {
              e.stopPropagation();
              props.setShow(false);
            }}
          >
            Close
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

const Detail: React.FC<{
  selectProject: string;
  // setSelectProject: any;
}> = (props) => {
  const RoleItem: React.FC<{ name: string; role: string }> = (props) => {
    const [editModal, setEditModel] = useState<boolean>(false);
    const [selectName, setSelectName] = useState<string>("");
    const [role, setRole] = useState<string>("edit");

    return (
      <ListGroup.Item
        onClick={() => {
          console.log("user click", props.name);
          setSelectName(props.name);
          setRole(props.role);
          setEditModel(editModal);
        }}
      >
        <div className="flex w-full justify-between">
          <p>{props.name}</p>
          {props.role == "edit" && <VscEdit className="h-5 w-5" />}
          {props.role == "owner" && <HiUser className="h-5 w-5" />}
          {props.role == "view" && <BiShow className="h-5 w-5" />}
        </div>
        <PermissionModal
          show={false}
          setShow={setEditModel}
          person={selectName}
          role={role}
          setRole={setRole}
        />
      </ListGroup.Item>
    );
  };

  const users = useUsers();
  const userlist: { name: string; role: string }[] = [];
  users.data?.names.forEach((name) => {
    userlist.push({ name: name, role: "owner" });
  });

  return (
    <div className="flex grow flex-col items-center py-3">
      <div className="w-11/12 py-3">
        {props.selectProject !== "" && (
          <Card className="dark:bg-blue-400">
            <p className="text-xl font-bold">{props.selectProject}</p>
            <ListGroup>
              {userlist.map((data) => {
                return <RoleItem name={data.name} role={data.role}></RoleItem>;
              })}
            </ListGroup>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Detail;
