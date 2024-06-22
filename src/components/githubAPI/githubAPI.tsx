import { Octokit } from "@octokit/rest";

const GITHUB_TOKEN = "ghp_f17LOtkAU4pObqGYvCn77PM2UV1AMx0g2hgfshsgfhNGm";
const GIST_ID = "e82304366ee0c2cdc009b7ec7f3d116gfdshfd2";

const octokit = new Octokit({
  auth: GITHUB_TOKEN,
});

export async function fetchMenuContent(): Promise<string | null> {
  try {
    const response = await octokit.gists.get({
      gist_id: GIST_ID,
    });

    const gist = response.data;

    // Vérifier si gist.files existe et si gist.files['menu'] existe
    if (gist.files && gist.files["menu"]) {
      const menuFile = gist.files["menu"];
      const menuContent = menuFile.content;

      // Vérifier si menuContent est défini
      if (typeof menuContent === "string") {
        return menuContent;
      } else {
        console.error("Invalid menu content.");
        return null;
      }
    } else {
      console.error('File "menu" not found in the Gist.');
      return null;
    }
  } catch (error) {
    console.error("Error fetching Gist:", error);
    return null;
  }
}

export async function updateMenuContent(newContent: string): Promise<void> {
  try {
    const response = await octokit.gists.get({
      gist_id: GIST_ID,
    });

    const gist = response.data;

    // Mettre à jour le fichier 'menu' dans gist.files
    await octokit.gists.update({
      gist_id: GIST_ID,
      files: {
        menu: {
          content: newContent,
        },
      },
    });

    console.log("Gist updated successfully.");
  } catch (error) {
    console.error("Error updating Gist:", error);
  }
}
