type GenerateHeadMetaProps = {
  title: string;
  description?: string;
  url: string;
  isPublic?: boolean;
  type?: "website" | "article";
  keywords?: string[];
  createdAt?: string;
  bgPath?: string;
};

export const generateHeadMeta = ({
  title,
  description,
  url,
  isPublic,
  type,
  keywords,
  createdAt,
  bgPath,
}: GenerateHeadMetaProps) => {
  const head = [
    {
      title: title,
    },
    {
      name: "og:title",
      content: title,
    },
    {
      name: "twitter:title",
      content: title,
    },
    {
      name: "og:url",
      content: url,
    },
    {
      name: "twitter:url",
      content: url,
    },
  ];

  if (bgPath) {
    head.push(
      {
        name: "twitter:image",
        content: bgPath,
      },
      {
        name: "og:image",
        content: bgPath,
      },
    );
  }

  if (description) {
    head.push(
      {
        name: "og:description",
        content: description,
      },
      {
        name: "description",
        content: description,
      },
      {
        name: "twitter:description",
        content: description,
      },
    );
  }

  if (isPublic !== undefined) {
    head.push({
      name: "robots",
      content: isPublic ? "index, follow" : "noindex, nofollow",
    });
  }

  if (type) {
    head.push({
      name: "og:type",
      content: type,
    });
  }

  if (keywords && keywords.length > 0) {
    head.push({
      name: "keywords",
      content: keywords.join(", "),
    });
  }

  if (createdAt) {
    head.push({
      name: "article:published_time",
      content: createdAt,
    });
  }

  return head;
};
