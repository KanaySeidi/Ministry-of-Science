// src/consts/universities.ts
export type Univ = {
  id: number;
  title: string;
  key: string;
  passwordHash: string;
};

export const UNIVERSITIES: Univ[] = [
  {
    id: 1,
    title: "Кыргызский национальный университет им. Жусупа Баласагына",
    key: "KNU",
    passwordHash:
      "$2b$10$xj5b9MbeHC1/Rr/KSlOcOOYcRViPa3UUT/X2Ywd5v/CwpPge/8F2K",
  },
  {
    id: 2,
    title: "Кыргызский государственный университет им. И.Арабаева",
    key: "KGU",
    passwordHash:
      "$2b$10$tOpmur.l7wpYA9tJpr6RO.dvXS58uQlERY.Wmbalo2daaNhPPeNfS",
  },
  {
    id: 3,
    title: "Кыргызский государственный технический университет им. И.Раззакова",
    key: "KGTU",
    passwordHash:
      "$2b$10$Ux8SM5emWJ.ICtpR/LVeZ.AUkqDzu7slfjw2p5GkN1/76.jZGbmai",
  },
  {
    id: 4,
    title: "Бишкекский государственный университет им. К. Карасаева",
    key: "BGU",
    passwordHash:
      "$2b$10$S61ExZ5yhdeCNtOoJso4i.yfnYjbWcssiMuHfrInsUJgjYgWD7WAe",
  },
  {
    id: 5,
    title: "Кыргызская государственная академия физической культуры и спорта",
    key: "KGAFKIS",
    passwordHash:
      "$2b$10$8HcivAJFFKv9Rm1MI12SdeG3Gu4EXYMx/yHKE3QlQODhxErzy283W",
  },
  {
    id: 6,
    title: "Кыргызская государственная медицинская академия им. И.Ахунбаева",
    key: "KGMA",
    passwordHash:
      "$2b$10$L3ww7.GyAztuilSKC.AsVONikQnOh/F3xWnYGlyfW.9MuBw7ckerC",
  },
  {
    id: 7,
    title: "Кыргызский национальный аграрный университет им.К.И.Скрябина",
    key: "KNAU",
    passwordHash:
      "$2b$10$FAYY5wf0OjCDmXECm4ZQqu4NV75uz5dDz5/okCt/hHObEI42cACi6",
  },
  {
    id: 8,
    title: "Международный университет Кыргызской Республики",
    key: "MUKR",
    passwordHash:
      "$2b$10$1UNAGHm81qmKs1tBYsXzYukAlYjOOgC6KgW3UGIzKCZNZ5/QO5fUa",
  },
  {
    id: 9,
    title: "Академия МВД КР им. генерала –майора милиции Э.А.Алиева",
    key: "AMVDKR",
    passwordHash:
      "$2b$10$aQ4o33djWxqvAeLHLmmyruaDEAQjaq3cyptKUpDFtJ4sn9yrmW7rm",
  },
  {
    id: 10,
    title:
      "Кыргызский государственный университет культуры и искусства им. Б.Бейшеналиевой",
    key: "KGUKI",
    passwordHash:
      "$2b$10$/vckTq96BByeOpQF.5fyo.vmARYd1S8CxuBqNLqduDOv5.o1rB6He",
  },
  {
    id: 11,
    title: "Кыргызская национальная консерватория им. К.Молдобасанова",
    key: "KNK",
    passwordHash:
      "$2b$10$T0I9qpIzKdpLm9IFzZ6jl.V0NZ5VA8d1L5fOB4JY4i16xyXY0OPES",
  },
  {
    id: 12,
    title:
      "Национальная академия художеств Кыргызской Республики имени Т.Садыкова",
    key: "NAHKR",
    passwordHash:
      "$2b$10$saHbeBtLxp5yvGeOWJHKfemW//hVKFYYnFAXI1Ddv7bYBy9OTTE.6",
  },
  {
    id: 13,
    title: "Кыргызско-Турецкий университет «Манас»",
    key: "MANAS",
    passwordHash:
      "$2b$10$z9VKDXeugCRMyrFqtriHOO3K49irhxsew6t1XbiAamtiWCrEP5lSa",
  },
  {
    id: 14,
    title: "Кыргызско-Российский Славянский университет им.Б.Ельцина",
    key: "KRSU",
    passwordHash:
      "$2b$10$SnLDWJFcPsc4Cpn5JgsnL.Ddtme2.sVKi/yBo1splt7hkY1mTakbS",
  },
  {
    id: 15,
    title:
      "Академия государственного управления при Президенте Кыргызской Республики",
    key: "AGUPKR",
    passwordHash:
      "$2b$10$eLpNe0i544RdZBrsq8rfHOYibMNkTMn1f9SaL6LywOooFkovhFFIG",
  },
  {
    id: 16,
    title: "Кыргызский экономический университет им. М.Рыскулбекова",
    key: "KEU",
    passwordHash:
      "$2b$10$2fFmgwo0MOemBgBOiM5pXO1tOzlaGsEp1tdxNGfLHTw3WNJ0/19sO",
  },
  {
    id: 17,
    title: "Дипломатическая академия МИД КР им. К. Дикамбаева",
    key: "DAMIL",
    passwordHash:
      "$2b$10$ngh2LF5sAztZGqJQ1CP7X.P.pSGbynjkDQpUFQmdo3qHeTudBiZR6",
  },
  {
    id: 18,
    title: "Военный институт Вооруженных Сил КР им. К. Усенбекова",
    key: "VIKR",
    passwordHash:
      "$2b$10$gcvb1oPbbXF5vNbxIVnsxe34n6tb2PHM/2ikMrIJlcDnJmq0a5QBm",
  },
  {
    id: 19,
    title: "Кыргызский авиационный институт им. Абдыраимова",
    key: "KAI",
    passwordHash:
      "$2b$10$V7XegGWNkB/yfI9ZL5YkAeHLrYeVWIX9JPpbXVAJJ2eoKwMMDoIPq",
  },
  {
    id: 20,
    title: "Ошский государственный университет",
    key: "OSHU",
    passwordHash:
      "$2b$10$eJtuwV7pVXPBnxqepvuEuenw3xibMbmg04Zk0Mcbo/nS88ZdGr30G",
  },
  {
    id: 21,
    title: "Ошский технологический университет им.М.Адышева",
    key: "OSHTU",
    passwordHash:
      "$2b$10$Ttb3eL5kjtliJxYvVBqd4.He4S0O6t0Zk2YfUNaK7SH76c.WW0OYK",
  },
  {
    id: 22,
    title: "Ошский государственный педагогический университет",
    key: "OGPU",
    passwordHash:
      "$2b$10$i49kOISxmz8Ue1hlHXlt/.TPULfctj6cLVBbqnb9lV4ij42bqdElG",
  },
  {
    id: 23,
    title: "Кыргызско-Узбекский международный университет им.Б. Сыдыкова",
    key: "KUMU",
    passwordHash:
      "$2b$10$VAYJvLipZlO8QHO7vC2SiefnKDV3q7mk0mX2BMM5vzxrH96yEU1z.",
  },
  {
    id: 24,
    title: "Жалал-Абадский государственный университет им. Б. Осмонова",
    key: "ZHAGU",
    passwordHash:
      "$2b$10$oMv9i1VqsKeNBfd6WTojuOvnlBcI5gSBc9Stj/TnGwKTayw9QStx6",
  },
  {
    id: 25,
    title: "Баткенский государственный университет",
    key: "BATGU",
    passwordHash:
      "$2b$10$4EcYiLFOuw/7.KnuXN4DoeDpbIn5AQi.c3wqBnWcJVeHzDtCoGJGK",
  },
  {
    id: 26,
    title: "Иссык-Кульский государственный университет им. К.Тыныстанова",
    key: "IKGU",
    passwordHash:
      "$2b$10$VD4TWGEp3qvNtsjtAyKQNePqlnfTk9Cu2wzMQeksjV40ZoBwizwL2",
  },
  {
    id: 27,
    title: "Нарынский государственный университет им. С.Нааматова",
    key: "NGU",
    passwordHash:
      "$2b$10$B6obDl5ZSLkNygKHd/UV8.FjqZWRvQowLSOq3wGJPgDqYZ/J0OJd.",
  },
  {
    id: 28,
    title: "Таласский государственный университет",
    key: "TALGU",
    passwordHash:
      "$2b$10$BlhPpolvHAsUKyHNmZtppuDl5o5UQdO0tpH9pwsYURuhbYWtx59Yu",
  },
  {
    id: 29,
    title: "Юридическая академия Генеральной прокуратуры Кыргызской Республики",
    key: "YAGP",
    passwordHash:
      "$2b$10$J6bR/ScogE54Es7t5ANnhuJ5Ylnwn5bi4N9SvrrQa1pRd43LnEzhW",
  },
  {
    id: 30,
    title:
      "Научно-исследовательский институт инновационной экономики им. Ш.Мусакожаева при КЭУ",
    key: "NIIIE",
    passwordHash:
      "$2b$10$QC7CfGs797TsMDqDXy3t5eCCqDm3Iu7bRU7JosmVpiHCyqbkO/TAO",
  },
  {
    id: 31,
    title: "Исламская академия",
    key: "IAK",
    passwordHash:
      "$2b$10$AbFruUl4gEUw7fWOC7aEqOgeTfomiyQmUuUirCzrG4gHFFxn12bWO",
  },
  {
    id: 32,
    title: "Бишкекский музыкально-педагогический институт им. Т. Эрматова",
    key: "BMPI",
    passwordHash:
      "$2b$10$8JPcRfegt7xNLghXccGFT.dLtod6tC2NnBjBLojJnVByP9FBcdfuq",
  },
  {
    id: 33,
    title: "Академия ГКНБ им. генерал-лейтенанта им. А.К. Бакаева",
    key: "AGKNB",
    passwordHash:
      "$2b$10$wq9qpVlOGSU/UZyFqQuQ/uXhedk/H7y/4tHerwJEPlG0fay3aF85a",
  },
  {
    id: 34,
    title: "Админ",
    key: "Admin",
    passwordHash:
      "$2b$10$hzfcNN4ZrseXz/V8elISQ.6K.gikGQXAQnJMvqLCslooHHcETEi5S",
  },
];
