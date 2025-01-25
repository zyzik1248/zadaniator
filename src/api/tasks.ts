import { ITask, ITaskComment } from "../types.ts";
import { privateApi } from "./privateApi.ts";

// Tworzenie zadania
export const createTask = async ({
    title,
    project,
    description,
    progress,
    story_points,
    created_by,
    priority,
}: ITask) => {
    try {
        const resp = await privateApi(`/api/tasks/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title,
                project,
                description,
                progress,
                story_points,
                created_by,
                priority,
            }),
        });
        return resp;
    } catch (error) {
        throw new Error(error);
    }
};

// Aktualizacja zadania
export const updateTask = async ({
    title,
    project,
    description,
    progress,
    story_points,
    id,
    priority,
    approved_by_tester,
}: ITask) => {
    try {
        const bodyData: any = {
            title,
            project,
            description,
            progress,
            story_points,
            priority,
        };

        if (typeof approved_by_tester !== 'undefined') {
            bodyData.approved_by_tester = approved_by_tester;
        }

        const resp = await privateApi(`/api/tasks/${id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bodyData),
        });
        return resp;
    } catch (error) {
        throw new Error(error);
    }
};

// Usuwanie zadania
export const deleteTask = async (id: number) => {
    try {
        const resp = await privateApi(`/api/tasks/${id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return resp;
    } catch (error) {
        throw new Error(error);
    }
};

export const getTaskDetails = async (taskId: number): Promise<ITask> => {
  try {
      const response = await privateApi(`/api/tasks/${taskId}/`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          },
      });

      return response;
  } catch (error) {
      console.error('Error fetching task details:', error);
      throw error;
  }
};

// Pobieranie komentarzy dla zadania
export const getTaskComments = async (taskId: number): Promise<ITaskComment[]> => {
  try {
      // Pobierz komentarze
      const response = await privateApi(`/api/tasks/${taskId}/comments/`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          },
      });

      const comments: ITaskComment[] = await response;

      // Pobierz użytkowników
      const usersResponse = await privateApi(`/api/users`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          },
      });

      // Dodaj nazwę autora do każdego komentarza
      const commentsWithAuthorName = comments.map((comment) => {
          const author = usersResponse.find((user: { id: number }) => user.id === comment.author);
          return {
              ...comment,
              authorName: author ? `${author.username} [${author.email}]` : `Unknown (${comment.author})`,
          };
      });

      console.log(commentsWithAuthorName)

      return commentsWithAuthorName;
  } catch (error) {
      console.error('Error fetching task comments with author names:', error);
      throw error;
  }
};


// Dodawanie komentarza do zadania
export const addTaskComment = async (
  taskId: number,
  comment: Omit<ITaskComment, 'id'>
): Promise<ITaskComment> => {
  try {
      const response = await privateApi(`/api/tasks/${taskId}/comments/`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(comment),
      });

      return response;
  } catch (error) {
      console.error(error);
      throw error;
  }
};

// Usuwanie komentarza
export const deleteTaskComment = async (taskId: number, commentId: number): Promise<void> => {
  try {
      const response = await privateApi(`/api/tasks/${taskId}/comments/${commentId}/`, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json',
          },
      });

  } catch (error) {
      console.error(error);
      throw error;
  }
};
