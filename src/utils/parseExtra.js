
export const parseExtraField = (extra) => {
  if (!extra) return {};

  const email = extra.match(/Email:\s*([^\s]+)/i)?.[1];
  const phone = extra.match(/Tel[eé]fono:\s*([\+\d\s\-]+)/i)?.[1]?.trim();
  const linkedin = extra.match(/Linkedin.*?(https?:\/\/[^\s]+)/i)?.[1];
  const areasRaw = extra.match(/Áreas en las que puede ofrecer mentoring:\s*(.+)/i)?.[1];

  const areas = areasRaw
    ? areasRaw.split(/[,•·\n]/).map((a) => a.trim()).filter(Boolean)
    : [];

  const name = extra.split('Email:')[0]?.trim();

  return { name, email, phone, linkedin, areas };
};
