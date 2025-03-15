import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
  Form,
  Input,
  Textarea,
  addToast,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@heroui/react";

export const AcmeLogo = () => {
  return (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

import "./App.css";

function App() {
  //#region nav
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = ["Cadastro", "Relatórios", "Editar"];
  //#endregion
  //#region form
  const [submitted, setSubmitted] = React.useState(null);

  const onSubmit = (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.currentTarget));

    addToast({
      title: `Toast Title ${e.text}`,
    });

    setSubmitted(data);
  };
  //#endregion

  const rows = [
    {
      key: "1",
      name: "Tony Reichert",
      role: "CEO",
      status: "Active",
    },
    {
      key: "2",
      name: "Zoey Lang",
      role: "Technical Lead",
      status: "Paused",
    },
    {
      key: "3",
      name: "Jane Fisher",
      role: "Senior Developer",
      status: "Active",
    },
    {
      key: "4",
      name: "William Howard",
      role: "Community Manager",
      status: "Vacation",
    },
  ];

  const columns = [
    {
      key: "lixo",
      label: "REMOVE",
    },
    {
      key: "detalhes",
      label: "DETALHES",
    },
    {
      key: "nome",
      label: "NOME",
    },
    {
      key: "obs",
      label: "OBSERVAÇÕES",
    },
    {
      key: "data",
      label: "DATA DE CADASTRO",
    },
    {
      key: "dados",
      label: "VER DADOS",
    },
  ];

  return (
    <>
      <Navbar onMenuOpenChange={setIsMenuOpen}>
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand>
            <AcmeLogo />
            <p className="font-bold text-inherit">ACME</p>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link href="#">Estações de análise</Link>
          </NavbarItem>
          <NavbarItem>
            <Link aria-current="page" href="#">
              Dados de qualidade do ar
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <Link href="#">Login</Link>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} color="primary" href="#" variant="flat">
              Sign Up
            </Button>
          </NavbarItem>
        </NavbarContent>
        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                className="w-full"
                color={
                  index === 2
                    ? "primary"
                    : index === menuItems.length - 1
                    ? "danger"
                    : "foreground"
                }
                href="#"
                size="lg"
              >
                {item}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>

      <div className="text-4xl text-center pt-4">
        <h1>Menu de estações de análise</h1>
      </div>
      <div className="p-8 m-auto max-w-[800px] bg-foreground-900 rounded-[8px] mt-8">
        <div className="text-2xl">
          <h1>Adicionar estação</h1>
        </div>
        <div className="pt-6">
          <Form className="w-full max-w" onSubmit={onSubmit}>
            <Input
              required
              label="Nome da estação"
              labelPlacement="inside"
              name="StationName"
              placeholder="Nome da estação"
              type="text"
            />
            <Textarea
              className="max-w"
              label="Observações"
              name="StationObs"
              placeholder="Enter your description"
            />
            <Button type="submit" variant="bordered">
              Cadastrar
            </Button>
            {submitted && (
              <div className="text-small text-default-500">
                Dados enviados: <code>{JSON.stringify(submitted)}</code>
              </div>
            )}
          </Form>
        </div>
      </div>
      <div className="m-auto max-w-[800px] mt-8">
        <Table aria-label="Example table with dynamic content">
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody items={rows}>
            {(item) => (
              <TableRow key={item.key}>
                {(columnKey) => (
                  <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

export default App;
