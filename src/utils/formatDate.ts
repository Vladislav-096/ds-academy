export const formatDate = (dateString: string) => {
  if (dateString === "") {
    return "";
  }

  const dateParts = dateString.split(".");
  const day = parseInt(dateParts[0], 10);
  const month = parseInt(dateParts[1], 10);
  const year = dateParts[2];

  const months = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ];

  return `${day} de ${months[month - 1]} de ${year}`;
};
