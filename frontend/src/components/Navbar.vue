<template>
    <nav>
        <v-navigation-drawer permanent v-model="drawer" dark app mini-variant class="blue accent-2">
            <v-list tile>
                <v-list-item class="mb-8" router to="/import">
                    <v-list-item-action>
                        <v-icon>fas fa-file-import</v-icon>
                    </v-list-item-action>
                </v-list-item>
                <v-list-item class="mb-8" router to="/orders">
                    <v-list-item-action>
                        <v-icon>fas fa-database</v-icon>
                    </v-list-item-action>
                </v-list-item>
                <v-list-item class="mb-8" router to="/graphics">
                    <v-list-item-action>
                        <v-icon>fas fa-chart-line</v-icon>
                    </v-list-item-action>
                </v-list-item>
                <v-list-item class="mb-8" router to="/asd">
                    <v-list-item-action>
                        <v-icon>fas fa-user</v-icon>
                    </v-list-item-action>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </nav>
</template>