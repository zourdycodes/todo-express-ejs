/* eslint-disable @typescript-eslint/no-explicit-any */
type Notes = {
  id: number;
  title: string;
  timestamp: number;
  contents: string;
};

interface Controller {
  notes: Notes[];
  currentId: number;
  getNotes(searchTerm: string): Notes[];
  getNote(id: number): Notes | undefined;
  addNote(note: Notes): void;
  deleteNote(id: number): Notes[];
}

class DatabaseService implements Controller {
  public currentId = 3;
  public notes: Notes[] = [
    {
      id: 1,
      title: 'My First Note',
      timestamp: Date.now(),
      contents:
        'Meow to be let in. Ha ha, you are funny i will kill you last. Licks your face. Ask for petting fight an alligator and win or this cat happen now, it was too purr-fect!!! so hate dogs i hate cucumber pls dont throw it at me. Kitty ipsum dolor sit amet, shed everywhere shed everywhere stretching attack your ankles chase the red dot, hairball run catnip eat the grass sniff cats woo. Purrrrrr floof tum, tickle bum',
    },
    {
      id: 2,
      title: 'My Second Note',
      timestamp: Date.now(),
      contents:
        'Fight own tail attack the child or stretch out on bed so dont nosh on the birds. Throwup on your pillow intently stare at the same spot disappear for four days and return home with an expensive injury; bite the vet chase after silly colored fish toys around the house yet spill litter box, scratch at owner, destroy all furniture, especially couch kitty. Haha you hold me hooman i scratch i like big cats.',
    },
  ];

  public getNotes(searchTerm: any): Notes[] {
    if (!searchTerm) {
      return this.notes;
    }

    return this.notes.filter(
      (note) =>
        note.title.includes(searchTerm) || note.contents.includes(searchTerm)
    );
  }

  public getNote(id: number): Notes | undefined {
    if (!id) {
      throw new Error('id is potentially undefined');
    }

    return this.notes.find((note) => note.id === id);
  }

  public addNote(note: Notes): void {
    this.notes.push({
      ...note,
      id: this.currentId,
      timestamp: Date.now(),
    });
    this.currentId++;
  }

  public deleteNote(id: number): Notes[] {
    return this.notes.filter((note) => note.id !== id);
  }
}

export const controllers = new DatabaseService();
